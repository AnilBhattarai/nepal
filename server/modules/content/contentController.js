const httpStatus = require('http-status');
var objectId = require('mongoose').Types.ObjectId;
const otherHelper = require('../../helper/others.helper');
const contentSch = require('./contentSchema');
const contentConfig = require('./contentConfig');
const contentController = {};
const { assignPage, assignSize, assignQuerySort } = require('../../helper/module.helper');
const internal = {};

contentController.GetContent = async (req, res, next) => {
  try {
    let { page, size, populate, selectQuery, searchQuery, sortQuery } = otherHelper.parseFilters(req, 10, false);
    if (req.query.find_name) {
      searchQuery = { name: { $regex: req.query.find_name, $options: 'i' }, ...searchQuery };
    }
    if (req.query.find_key) {
      searchQuery = { key: { $regex: req.query.find_key, $options: 'i' }, ...searchQuery };
    }
    if (req.query.find_publish_from) {
      searchQuery = { publish_from: { $regex: req.query.find_publish_from, $options: 'i' }, ...searchQuery };
    }
    if (req.query.find_publish_to) {
      searchQuery = { publish_to: { $regex: req.query.find_publish_to, $options: 'i' }, ...searchQuery };
    }
    if (req.query.find_is_feature) {
      searchQuery = { is_feature: req.query.find_is_feature, ...searchQuery };
    }
    selectQuery = 'name key description publish_from publish_to is_active is_feature is_deleted';
    if (req.query.find_is_page) {
      searchQuery = { ...searchQuery, is_page: req.query.find_is_page };
    }
    if (req.query.find_is_ad == 'true' || req.query.find_is_ad == true) {
      searchQuery = { ...searchQuery, is_ad: req.query.find_is_ad };
    } else {
      searchQuery = { ...searchQuery, is_ad: { $ne: true } };
    }
    let datas = await otherHelper.getquerySendResponse(contentSch, page, size, sortQuery, searchQuery, selectQuery, next, populate);

    return otherHelper.paginationSendResponse(res, httpStatus.OK, true, datas.data, contentConfig.gets, page, size, datas.totaldata);
  } catch (err) {
    next(err);
  }
};
contentController.SaveContent = async (req, res, next) => {
  try {
    const contents = req.body;
    if (contents.image && contents.image.length == 24) {
    } else {
      delete contents.image;
    }
    if (contents && contents._id) {
      const update = await contentSch.findByIdAndUpdate(contents._id, { $set: contents }, { new: true });
      return otherHelper.sendResponse(res, httpStatus.OK, true, update, null, contentConfig.save, null);
    } else {
      contents.added_by = req.user.id;
      const newContent = new contentSch(contents);
      const contentsSave = await newContent.save();
      return otherHelper.sendResponse(res, httpStatus.OK, true, contentsSave, null, contentConfig.save, null);
    }
  } catch (err) {
    next(err);
  }
};
contentController.GetContentDetail = async (req, res, next) => {
  try {
    const id = req.params.id;
    const contents = await contentSch.findOne({ _id: id, is_deleted: false });
    return otherHelper.sendResponse(res, httpStatus.OK, true, contents, null, contentConfig.get, null);
  } catch (err) {
    next(err);
  }
};
contentController.GetContentByKey = async (req, res, next) => {
  try {
    const key = req.params.key;
    const contents = await contentSch.findOne({ key, is_deleted: false, is_active: true });
    return otherHelper.sendResponse(res, httpStatus.OK, true, contents ? contents : { key: req.params.key, description: `<div/>` }, null, contentConfig.get, null);
  } catch (err) {
    next(err);
  }
};
contentController.DeleteContent = async (req, res, next) => {
  try {
    const id = req.params.id;
    const del = await contentSch.findByIdAndUpdate(id, { $set: { is_deleted: true } }, { new: true });
    return otherHelper.sendResponse(res, httpStatus.OK, true, del, null, 'content delete success!!', null);
  } catch (err) {
    next(err);
  }
};

module.exports = contentController;
