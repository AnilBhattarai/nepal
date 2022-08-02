const httpStatus = require('http-status');
const otherHelper = require('../../helper/others.helper');
const propertySch = require('../property/propertySchema');
const objectId = require('mongoose').Types.ObjectId;
const viewCountSch = require('./viewCountSchema');

const viewCountController = {};

viewCountController.postViewCount = async (req, res, next) => {
  try {
    const { property_id } = req.body;
    if (req.user) {
      const d = await viewCountSch.findOne({ added_by: req.user.id, property_id: property_id });
      if (d && d._id) {
        const update = await viewCountSch.findByIdAndUpdate(d._id, { $inc: { property_count: 1 } }, { new: true });
        const saved = await viewCountSch.findOne({ _id: d._id }).lean();
        return otherHelper.sendResponse(res, httpStatus.OK, true, saved, null, 'view count updated', null);
      } else {
        let viewCount = { property_id };
        viewCount.added_by = req.user.id;
        const newFav = new viewCountSch(viewCount);
        const viewCountSave = await newFav.save();
        await propertySch.findByIdAndUpdate({ _id: property_id }, { $inc: { view_count_user: 1 } });
        const saved = await viewCountSch.findOne({ _id: viewCountSave._id }).lean();
        return otherHelper.sendResponse(res, httpStatus.OK, true, saved, null, 'view count saved', null);
      }
    } else {
      const guestCount = await viewCountSch.findOne({ is_guest: true });
      if (guestCount && guestCount._id) {
        const update = await viewCountSch.findByIdAndUpdate(guestCount._id, { $inc: { property_count: 1 } }, { new: true });
        const saved = await viewCountSch.findOne({ _id: guestCount._id }).lean();
        await propertySch.findByIdAndUpdate({ _id: property_id }, { $inc: { view_count_guest: 1 } });
        return otherHelper.sendResponse(res, httpStatus.OK, true, saved, null, 'view count updated', null);
      } else {
        let viewCount = { property_id };
        viewCount.is_guest = true;
        const newFav = new viewCountSch(viewCount);
        const viewCountSave = await newFav.save();
        const saved = await viewCountSch.findOne({ _id: viewCountSave._id }).lean();
        await propertySch.findByIdAndUpdate({ _id: property_id }, { $inc: { view_count_guest: 1 } });
        return otherHelper.sendResponse(res, httpStatus.OK, true, saved, null, 'view count saved', null);
      }
    }
  } catch (err) {
    next(err);
  }
};

viewCountController.getAllPropertyViewCount = async (req, res, next) => {
  let data = await viewCountSch.aggregate([
    {
      $group: {
        _id: '$property_id',
        count: { $sum: '$property_count' },
      },
    },
    { $lookup: { from: 'properties', localField: '_id', foreignField: '_id', as: 'properties' } },
    {
      $project: {
        _id: 1,
        count: 1,
        properties: {
          name: 1,
          view_count_user: 1,
          view_count_guest: 1,
        },
      },
    },
    {
      $sort: { count: -1 },
    },
  ]);
  return otherHelper.sendResponse(res, httpStatus.OK, true, data, null, null, null);
};

viewCountController.getViewCountByProperty = async (req, res, next) => {
  try {
    let propertyId = req.params.id;
    let data = await viewCountSch.aggregate([
      { $match: { property_id: objectId(propertyId) } },
      {
        $group: {
          _id: '$property_id',
          count: { $sum: '$property_count' },
        },
      },
      { $lookup: { from: 'properties', localField: '_id', foreignField: '_id', as: 'property' } },
      {
        $project: {
          _id: 1,
          count: 1,
          property: {
            name: 1,
            view_count_user: 1,
            view_count_guest: 1,
            _id: 1,
          },
        },
      },
      {
        $sort: { count: -1 },
      },
    ]);
    return otherHelper.sendResponse(res, httpStatus.OK, true, data, null, 'property view count of a property', null);
  } catch (err) {
    next(err);
  }
};

viewCountController.getViewCountByUser = async (req, res, next) => {
  try {
    let data = await viewCountSch.find({ added_by: req.user.id }).sort('property_count');
    return otherHelper.sendResponse(res, httpStatus.OK, true, data, null, 'property view count of a user', null);
  } catch (err) {
    next(err);
  }
};

module.exports = viewCountController;
