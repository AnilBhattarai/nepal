const httpStatus = require('http-status');
const otherHelper = require('../../helper/others.helper');
const resourceSch = require('./resourceSchema');
const resourceConfig = require('./resourceConfig');
const resourceController = {};

resourceController.GetResource = async (req, res, next) => {
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
    selectQuery = 'name key file_id publish_from publish_to is_active resource_for is_deleted';
    if (req.query.find_is_page) {
      searchQuery = { ...searchQuery, is_page: req.query.find_is_page };
    } populate = [
      {
        path: 'file_id'
      }
    ];
    let datas = await otherHelper.getquerySendResponse(resourceSch, page, size, sortQuery, searchQuery, selectQuery, next, populate);

    return otherHelper.paginationSendResponse(res, httpStatus.OK, true, datas.data, resourceConfig.gets, page, size, datas.totaldata);
  } catch (err) {
    next(err);
  }
};
resourceController.PostResource = async (req, res, next) => {
  try {
    const resources = req.body;
    if (resources && resources._id) {
      const update = await resourceSch.findByIdAndUpdate(resources._id, { $set: resources }, { new: true });
      return otherHelper.sendResponse(res, httpStatus.OK, true, update, null, resourceConfig.save, null);
    } else {
      resources.added_by = req.user.id;
      const newResource = new resourceSch(resources);
      const resourcesSave = await newResource.save();
      return otherHelper.sendResponse(res, httpStatus.OK, true, resourcesSave, null, resourceConfig.save, null);
    }
  } catch (err) {
    next(err);
  }
};
resourceController.getPublicResource = async (req, res, next) => {
  try {
    let { page, size, populate, selectQuery, searchQuery, sortQuery } = otherHelper.parseFilters(req, 100, false);
    searchQuery = { ...searchQuery, is_active: true };
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
    selectQuery = 'name key file_id publish_from publish_to is_active is_feature is_deleted resource_for';
    if (req.query.find_is_page) {
      searchQuery = { ...searchQuery, is_page: req.query.find_is_page };
    }
    populate = [
      {
        path: 'file_id'
      }
    ];
    let datas = await otherHelper.getquerySendResponse(resourceSch, page, size, sortQuery, searchQuery, selectQuery, next, populate);

    return otherHelper.paginationSendResponse(res, httpStatus.OK, true, datas.data, resourceConfig.gets, page, size, datas.totaldata);
  } catch (err) {
    next(err);
  }
};
resourceController.GetResourceById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const resources = await resourceSch.findOne({ _id: id, is_deleted: false }).populate([{ path: 'file_id' }]);
    return otherHelper.sendResponse(res, httpStatus.OK, true, resources, null, resourceConfig.get, null);
  } catch (err) {
    next(err);
  }
};
resourceController.GetResourceByKey = async (req, res, next) => {
  try {
    const key = req.params.key;
    const resources = await resourceSch.findOne({ key, is_deleted: false, is_active: true });
    return otherHelper.sendResponse(res, httpStatus.OK, true, resources ? resources : { key: req.params.key, file_id: `<div>Resource not found key=${req.params.key}</div>` }, null, resourceConfig.get, null);
  } catch (err) {
    next(err);
  }
};
resourceController.DeleteResource = async (req, res, next) => {
  try {
    const id = req.params.id;
    const del = await resourceSch.findByIdAndUpdate(id, { $set: { is_deleted: true } }, { new: true });
    return otherHelper.sendResponse(res, httpStatus.OK, true, del, null, 'resource delete success!!', null);
  } catch (err) {
    next(err);
  }
};

module.exports = resourceController;
