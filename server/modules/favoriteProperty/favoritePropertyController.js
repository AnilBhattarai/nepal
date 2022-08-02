const httpStatus = require('http-status');
const otherHelper = require('../../helper/others.helper');
const favSch = require('./favoritePropertySchema');
const propertySch = require('../property/propertySchema');
const favConfig = require('./favoritePropertyConfig');
const favController = {};

favController.postFavorite = async (req, res, next) => {
  try {
    const { is_favourite, property_id } = req.body;
    const d = await favSch.findOne({ added_by: req.user.id, property_id: property_id });
    if (d && d._id) {
      const update = await favSch.findByIdAndUpdate(d._id, { $set: { is_favourite: is_favourite, property_id: property_id } }, { new: true });
      return otherHelper.sendResponse(res, httpStatus.OK, true, update, null, 'Favorite updated', null);
    } else {
      let favourite = { is_favourite: is_favourite, property_id: property_id };
      favourite.added_by = req.user.id;
      const newFav = new favSch(favourite);
      const favSave = await newFav.save();
      return otherHelper.sendResponse(res, httpStatus.OK, true, favSave, null, 'Favorite Saved', null);
    }
  } catch (err) {
    next(err);
  }
};

favController.getFavorite = async (req, res, next) => {
  try {
    let realData = [];
    const size_default = 10;
    let page;
    let size;
    let searchQuery = { added_by: req.user.id, is_favourite: true, is_delete: false };
    let sortQuery = '-_id';
    if (req.query.page && !isNaN(req.query.page) && req.query.page != 0) {
      page = Math.abs(req.query.page);
    } else {
      page = 1;
    }
    if (req.query.size && !isNaN(req.query.size) && req.query.size != 0) {
      size = Math.abs(req.query.size);
    } else {
      size = size_default;
    }
    if (req.query.sort) {
      let sortfield = req.query.sort.slice(1);
      let sortby = req.query.sort.charAt(0);
      if (sortby == 1 && !isNaN(sortby) && sortfield) {
        //one is ascending
        sortQuery = sortfield;
      } else if (sortby == 0 && !isNaN(sortby) && sortfield) {
        //zero is descending
        sortQuery = '-' + sortfield;
      } else {
        sortQuery = '';
      }
    }

    const selectQuery = 'is_favourite property_id added_by added_at';
    const populate = [
      {
        path: 'property_id',
        select: 'basic.title is_project project_id slug_url property_id price prefix is_negotiable is_premium is_featured is_verified is_active is_deleted',
        populate: [{ path: 'address.city_id', select: 'name' }, { path: 'address.area_id', select: 'name' }, { path: 'media.images.id' }],
      },
    ];
    let datas = await otherHelper.getquerySendResponse(favSch, page, size, sortQuery, searchQuery, selectQuery, next, populate);
    let needData = (resData) => {
      resData.data.map((each) => {
        if (each.property_id && each.property_id.is_verified && each.property_id.is_active && !each.property_id.is_deleted) {
          realData.push(each);
        }
      });
      return realData;
    };

    datas.data = needData(datas);
    datas.data.totaldata = realData.length;
    return otherHelper.paginationSendResponse(res, httpStatus.OK, true, datas.data, 'Favourite Get Succes!!', page, size, datas.data.totaldata);
  } catch (err) {
    next(err);
  }
};
favController.getForPropertyFavorite = async (req, res, next) => {
  const favorite = await favSch.findOne({ added_by: req.user.id, property_id: req.params.property_id, is_delete: false }).select({ property_id: 1, is_favourite: 1 });
  data = {
    is_favourite: false,
    property_id: req.params.property_id,
  };
  return otherHelper.sendResponse(res, httpStatus.OK, true, favorite || data, null, null, null);
};

module.exports = favController;
