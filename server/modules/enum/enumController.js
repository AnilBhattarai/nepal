const httpStatus = require('http-status');
var objectId = require('mongoose').Types.ObjectId;
const otherHelper = require('../../helper/others.helper');
const enumSch = require('./enumSchema');
const enumConfig = require('./enumConfig');
const propertySch = require('../property/propertySchema');
const enumController = {};
const internal = {};
enumController.GetAllEnumByGroup = async (req, res, next) => {
  try {
    let selectQuery = { title: 1, value: 1, description: 1, order: 1, is_active: 1, added_at: 1, media: 1 };
    const data = await enumSch.aggregate([{ $match: { is_deleted: false, is_active: true } }, { $group: { _id: '$type', data: { $push: { _id: '$_id', media: '$media', description: '$description', title: '$title', order: '$order' } } } }]);
    let v = {};
    for (let x = 0; x < data.length; x++) {
      let sorredData = data[x].data.sort((a, b) => b.order - a.order);
      v[data[x]._id] = sorredData;
    }
    for (let i = 0; i < v.property_category.length; i++) {
      let count = 0;
      if (v.property_category[i]._id) {
        count = await propertySch.countDocuments({ 'basic.property_category': v.property_category[i]._id, is_deleted: false, is_verified: true, is_active: true, is_project: false });
      }
      v.property_category[i].count = count;
    }
    return otherHelper.sendResponse(res, httpStatus.OK, true, v);
    // return otherHelper.sendDatas(res, httpStatus.OK, true, v);
  } catch (err) {
    next(err);
  }
};
enumController.GetEnum = async (req, res, next) => {
  try {
    const size_default = 10;
    let page;
    let size;
    let searchQuery;
    let sortQuery;
    let selectQuery;
    let populate;
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
    searchQuery = { is_deleted: false, type: req.params.type };

    if (req.query.find_title) {
      searchQuery = { title: { $regex: req.query.find_title, $options: 'i' }, ...searchQuery };
    }
    selectQuery = 'title value image  description order is_active added_at media link';
    populate = { path: 'image', select: 'path' };

    let datas = await otherHelper.getquerySendResponse(enumSch, page, size, sortQuery, searchQuery, selectQuery, next, populate);

    return otherHelper.paginationSendResponse(res, httpStatus.OK, true, datas.data, enumConfig.gets.replace('%type%', req.params.type), page, size, datas.totaldata);
  } catch (err) {
    next(err);
  }
};
enumController.SaveEnum = async (req, res, next) => {
  try {
    const enums = req.body;
    enums.type = req.params.type;
    if (req.file) {
      req.file.destination = req.file.destination.split('\\').join('/').split('server/')[1] + '/';
      req.file.path = req.file.path.split('\\').join('/').split('server/')[1];
    }
    if (enums && enums._id) {
      if (req.file) {
        enums.media = req.file;
      }
      const ifAvailable = await enumSch.findOne({ _id: { $ne: enums._id }, type: enums.type, title: enums.title, is_deleted: false });
      if (ifAvailable) {
        return otherHelper.sendResponse(res, httpStatus.NOT_ACCEPTABLE, false, null, { title: enumConfig.alreadyExist.replace('%title%', enums.title) }, 'input error', null);
      }
      const update = await enumSch.findByIdAndUpdate(enums._id, { $set: enums }, { new: true });
      return otherHelper.sendResponse(res, httpStatus.OK, true, update, null, enumConfig.save.replace('%type%', req.params.type), null);
    } else {
      if (req.file) {
        enums.media = req.file;
      }
      const ifAvailable = await enumSch.findOne({ type: enums.type, title: enums.title, is_deleted: false });
      if (ifAvailable) {
        return otherHelper.sendResponse(res, httpStatus.NOT_ACCEPTABLE, false, null, { title: enumConfig.alreadyExist.replace('%title%', enums.title) }, 'input error', null);
      }
      enums.added_by = req.user.id;
      const newEnum = new enumSch(enums);
      const enumsSave = await newEnum.save();
      return otherHelper.sendResponse(res, httpStatus.OK, true, enumsSave, null, enumConfig.save.replace('%type%', req.params.type), null);
    }
  } catch (err) {
    next(err);
  }
};
enumController.SaveEnumAmenities = async (req, res, next) => {
  try {
    const enums = req.body;
    enums.type = 'amenities';
    if (req.file && req.file) {
      const media = req.file;
      media.destination = media.destination.split('\\').join('/').split('server/')[1] + '/';
      media.path = media.path.split('\\').join('/').split('server/')[1];
      enums.media = media;
    }
    if (enums && enums._id) {
      const ifAvailable = await enumSch.findOne({ _id: { $ne: enums._id }, type: enums.type, title: enums.title, is_deleted: false });
      if (ifAvailable) {
        return otherHelper.sendResponse(res, httpStatus.NOT_ACCEPTABLE, false, null, { title: enumConfig.alreadyExist.replace('%title%', enums.title) }, 'input error', null);
      }
      const update = await enumSch.findByIdAndUpdate(enums._id, { $set: enums }, { new: true });
      return otherHelper.sendResponse(res, httpStatus.OK, true, update, null, enumConfig.save.replace('%type%', req.params.type), null);
    } else {
      const ifAvailable = await enumSch.findOne({ type: enums.type, title: enums.title, is_deleted: false });
      if (ifAvailable) {
        return otherHelper.sendResponse(res, httpStatus.NOT_ACCEPTABLE, false, null, { title: enumConfig.alreadyExist.replace('%title%', enums.title) }, 'input error', null);
      }
      enums.added_by = req.user.id;
      const newEnum = new enumSch(enums);
      const enumsSave = await newEnum.save();
      return otherHelper.sendResponse(res, httpStatus.OK, true, enumsSave, null, enumConfig.save.replace('%type%', req.params.type), null);
    }
  } catch (err) {
    next(err);
  }
};
enumController.GetEnumDetail = async (req, res, next) => {
  try {
    const id = req.params.id;
    const enums = await enumSch.findOne({ _id: id, is_deleted: false, type: req.params.type }, { type: 0 }).populate([{ path: 'wanted_image' }, { path: 'image', select: 'path' }]);
    return otherHelper.sendResponse(res, httpStatus.OK, true, enums, null, enumConfig.get.replace('%type%', req.params.type), null);
  } catch (err) {
    next(err);
  }
};
enumController.DeleteEnum = async (req, res, next) => {
  try {
    const id = req.params.id;
    const del = await enumSch.findOneAndUpdate({ _id: id, is_deleted: false, type: req.params.type }, { $set: { is_deleted: true, deleted_by: req.user.id, deleted_at: new Date() } }, { new: true });
    return otherHelper.sendResponse(res, httpStatus.OK, true, del, null, 'enum delete success!!', null);
  } catch (err) {
    next(err);
  }
};

module.exports = enumController;
