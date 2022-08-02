const httpStatus = require('http-status');
const otherHelper = require('../../helper/others.helper');
const propertySch = require('./../property/propertySchema');
const userSch = require('./../user/userSchema');
const blogSch = require('./../blog/blogSchema');
const enumSch = require('./../enum/enumSchema');
const roleController = {};
roleController.getTotalProperty = async (req, res, next) => {
  try {
    const property_count = await propertySch.count({ is_deleted: false, is_project: false });
    const project_count = await propertySch.count({ is_deleted: false, is_project: true });
    const in_active_project_count = await propertySch.count({ is_deleted: false, is_project: false, is_active: false });
    const un_verified_project_count = await propertySch.count({ is_deleted: false, is_project: false, is_verified: false });
    return otherHelper.sendResponse(res, httpStatus.OK, true, { property: property_count, project: project_count, in_active_project_count, un_verified_project_count }, null, 'Get property count', null);
  } catch (err) {
    next(err);
  }
};
roleController.getPropertyEntryInLastXDays = async (req, res, next) => {
  try {
    const days = req.params.day;
    var d = new Date();
    d.setDate(d.getDate() - days);
    const property = await propertySch.aggregate([
      {
        $match: {
          added_at: { $gte: d },
          is_deleted: false,
        },
      },
      {
        $group: {
          _id: {
            month: { $month: '$added_at' },
            day: { $dayOfMonth: '$added_at' },
            year: { $year: '$added_at' },
          },
          amt: { $sum: 1 },
        },
      },
      {
        $sort: { '_id.year': 1, '_id.month': 1, '_id.day': 1 },
      },
      { $project: { _id: '$_id.year', month: '$_id.month', day: '$_id.day', amt: '$amt' } },
    ]);
    var data = [];
    for (let i = 0; i < days; i++) {
      d.setDate(d.getDate() + 1);
      let x = { _id: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate(), amt: 0 };
      let y = property.find((y) => y.day === x.day && y.month === x.month && y._id === x._id);
      if (y && y.amt) x.amt = y.amt;
      data.push(x);
    }
    return otherHelper.sendResponse(res, httpStatus.OK, true, data, null, 'Get property count', null);
  } catch (err) {
    next(err);
  }
};
roleController.getTopTenAreaByListing = async (req, res, next) => {
  try {
    const num = req.params.no;
    const property = await propertySch.aggregate([
      {
        $match: {
          is_deleted: false,
        },
      },
      { $project: { area_id: '$address.area_id' } },
      {
        $group: { _id: '$area_id', amt: { $sum: 1 } },
      },
      {
        $sort: { amt: -1 },
      },
      { $limit: 10 },
      {
        $lookup: {
          from: 'np_areas',
          localField: '_id',
          foreignField: '_id',
          as: 'area',
        },
      },
      { $project: { area: '$area.name', amt: '$amt' } },
      { $unwind: '$area' },
    ]);
    return otherHelper.sendResponse(res, httpStatus.OK, true, property, null, 'Get property count', null);
  } catch (err) {
    next(err);
  }
};
roleController.getPropertyEntryByCategory = async (req, res, next) => {
  try {
    const property = await propertySch.aggregate([
      {
        $match: {
          is_deleted: false,
        },
      },
      { $project: { property_category: '$basic.property_category' } },
      {
        $group: { _id: '$property_category', amt: { $sum: 1 } },
      },
      {
        $sort: { amt: -1 },
      },
      {
        $lookup: {
          from: 'enums',
          localField: '_id',
          foreignField: '_id',
          as: 'category',
        },
      },
      { $project: { category: '$category.title', amt: '$amt' } },
      { $unwind: '$category' },
    ]);
    return otherHelper.sendResponse(res, httpStatus.OK, true, property, null, 'Get property count', null);
  } catch (err) {
    next(err);
  }
};
roleController.getPropertyByPriceSegment = async (req, res, next) => {
  try {
    const property = await propertySch.aggregate([
      {
        $match: {
          is_deleted: false,
        },
      },
      { $project: { value: '$price.value' } },
      {
        $group: { _id: '$value', amt: { $sum: 1 } },
      },
      {
        $sort: { amt: -1 },
      },
    ]);
    let d = [
      { _id: 'Up to 50 K', min: 0, max: 50000, amt: 0 },
      { _id: '50 K to 5 Lakh', min: 50000, max: 500000, amt: 0 },
      { _id: '5 Lakh to 50 Lakh', min: 500000, max: 5000000, amt: 0 },
      { _id: '50 Lakh to 3 Cr.', min: 5000000, max: 30000000, amt: 0 },
      { _id: '3 Cr. to max', min: 30000000, max: 9000000000000, amt: 0 },
    ];
    for (let i = 0; i < property.length; i++) {
      if (property[i]._id > 30000000) {
        d[4].amt += property[i].amt;
      } else if (property[i]._id > 5000000) {
        d[3].amt += property[i].amt;
      } else if (property[i]._id > 500000) {
        d[2].amt += property[i].amt;
      } else if (property[i]._id > 50000) {
        d[1].amt += property[i].amt;
      } else if (property[i]._id > 0) {
        d[0].amt += property[i].amt;
      }
    }
    return otherHelper.sendResponse(res, httpStatus.OK, true, d, null, 'Get property count', null);
  } catch (err) {
    next(err);
  }
};
roleController.getActiveVsSoldProperty = async (req, res, next) => {
  try {
    const not_sold_out_count = await propertySch.count({ is_deleted: false, is_sold_out: false });
    const sold_out_count = await propertySch.count({ is_deleted: false, is_sold_out: true });
    return otherHelper.sendResponse(res, httpStatus.OK, true, { not_sold_out_count: not_sold_out_count, sold_out_count: sold_out_count }, null, 'Get property count', null);
  } catch (err) {
    next(err);
  }
};
roleController.getPendingProperty = async (req, res, next) => {
  try {
    const pending_count = await propertySch.count({ is_deleted: false, is_active: true, is_verified: false, is_project: false });
    return otherHelper.sendResponse(res, httpStatus.OK, true, { pending_count: pending_count }, null, 'Get property count', null);
  } catch (err) {
    next(err);
  }
};
roleController.getTopTenAgent = async (req, res, next) => {
  try {
    const property = await propertySch.aggregate([
      {
        $match: {
          is_deleted: false,
        },
      },
      {
        $group: { _id: '$agent_id', amt: { $sum: 1 } },
      },
      { $limit: 10 },
      {
        $sort: { amt: -1 },
      },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'agent',
        },
      },
      { $project: { agent: '$agent.name', amt: '$amt' } },
      { $unwind: '$agent' },
    ]);
    return otherHelper.sendResponse(res, httpStatus.OK, true, property, null, 'Get property count', null);
  } catch (err) {
    next(err);
  }
};

roleController.getNoOfUser = async (req, res, next) => {
  try {
    const days = req.params.day;
    var d = new Date();
    d.setDate(d.getDate() - days);
    const property = await userSch.aggregate([
      {
        $match: {
          added_at: { $gte: d },
          is_deleted: false,
        },
      },
      {
        $group: {
          _id: {
            month: { $month: '$added_at' },
            day: { $dayOfMonth: '$added_at' },
            year: { $year: '$added_at' },
          },
          amt: { $sum: 1 },
        },
      },
      {
        $sort: { '_id.year': 1, '_id.month': 1, '_id.day': 1 },
      },
      { $project: { _id: '$_id.year', month: '$_id.month', day: '$_id.day', amt: '$amt' } },
    ]);
    var data = [];
    for (let i = 0; i < days; i++) {
      d.setDate(d.getDate() + 1);
      let x = { _id: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate(), amt: 0 };
      let y = property.find((y) => y.day === x.day && y.month === x.month && y._id === x._id);
      if (y && y.amt) x.amt = y.amt;
      data.push(x);
    }
    return otherHelper.sendResponse(res, httpStatus.OK, true, data, null, 'Get User by Day', null);
  } catch (err) {
    next(err);
  }
};

roleController.getPostByAuthor = async (req, res, next) => {
  try {
    const data = await blogSch.aggregate([
      { $unwind: '$author' },
      {
        $group: { _id: '$author', amt: { $sum: 1 } },
      },
      {
        $sort: { amt: -1 },
      },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'author',
        },
      },
      { $project: { author: '$author.name', amt: '$amt' } },
      { $unwind: '$author' },
    ]);
    const count = await blogSch.count();
    return otherHelper.sendResponse(res, httpStatus.OK, true, { blog: data, count: count }, null, 'Get User by Day', null);
  } catch (err) {
    next(err);
  }
};
module.exports = roleController;
