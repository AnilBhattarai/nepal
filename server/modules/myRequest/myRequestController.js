const httpStatus = require('http-status');
const otherHelper = require('../../helper/others.helper');
const myRequestConfig = require('./myRequestConfig');
const myRequestSch = require('./myRequestSchema');
const myRequestController = {};

myRequestController.PostmyRequest = async (req, res, next) => {
  try {
    let data = req.body;
    if (data._id) {
      const update = await myRequestSch.findByIdAndUpdate({ _id: data._id }, { $set: data }, { new: true });
      return otherHelper.sendResponse(res, httpStatus.OK, true, update, null, myRequestConfig.updated, null);
    } else {
      if (req.user) {
        data.added_by = req.user.id
      }
      const newRequest = new myRequestSch(data);
      const myRequest = await newRequest.save();
      return otherHelper.sendResponse(res, httpStatus.OK, true, myRequest, null, myRequestConfig.save, null);
    }
  } catch (err) {
    next(err);
  }
};
myRequestController.GetmyRequest = async (req, res, next) => {
  try {
    let page;
    let size;
    let searchQuery;
    let sortQuery;
    let selectQuery;
    let populate;
    const size_default = 10;
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
      let sortField = req.query.sort.slice(1);
      let sortBy = req.query.sort.charAt(0);
      if (sortBy == 1 && !isNaN(sortBy)) {
        // 1 is for ascending
        sortQuery = sortField;
      } else if (sortBy == 0 && !isNaN(sortBy)) {
        //0 is for descending
        sortQuery = '-' + sortField;
      } else {
        sortQuery = '';
      }
    }
    searchQuery = { is_deleted: false, added_by: req.user.id };
    if (req.query.find_name) {
      searchQuery = {
        name: { $regex: req.query.find_name, $options: 'i' },
        ...searchQuery,
      };
    }
    if (req.query.find_purpose) {
      searchQuery = { purpose: { $regex: req.query.find_purpose, $options: 'i' }, ...searchQuery };
    }
    if (req.query.find_added_at) {
      searchQuery = { added_at: { $regex: req.query.find_added_at, $options: 'i' }, ...searchQuery };
    }

    // selectQuery = 'name email message added_at updated_at ';
    populate = [
      { path: 'purpose', select: { title: 1, _id: 0 } },
      { path: 'address.state_id', select: 'name' },
      { path: 'address.district_id', select: 'name' },
      { path: 'address.city_id', select: 'name' },
      { path: 'address.area_id', select: 'name' },
    ];

    let myRequests = await otherHelper.getquerySendResponse(myRequestSch, page, size, sortQuery, searchQuery, selectQuery, next, populate);

    return otherHelper.paginationSendResponse(res, httpStatus.OK, true, myRequests.data, myRequestConfig.gets, page, size, myRequests.totaldata);
  } catch (err) {
    next(err);
  }
};

myRequestController.GetmyRequestById = async (req, res, next) => {
  try {
    const id = req.params.id;
    let myRequest = await myRequestSch.findOne({ _id: id, is_deleted: false }).populate([
      // { path: 'purpose', select: { title: 1, _id: 0 } },
      { path: 'address.state_id', select: 'name' },
      { path: 'address.district_id', select: 'name' },
      { path: 'address.city_id', select: 'name' },
      { path: 'address.area_id', select: 'name' },
    ]);
    return otherHelper.sendResponse(res, httpStatus.OK, true, myRequest, null, myRequestConfig.get, null);
  } catch (err) {
    next(err);
  }
};

myRequestController.GetPublicRequest = async (req, res, next) => {
  try {
    let { page, size, sortQuery, searchQuery, selectQuery, populate } = otherHelper.parseFilters(req, 24, false);
    searchQuery = { ...searchQuery, is_approved: true };
    populate = [
      { path: 'purpose', select: 'type title' },
      { path: 'address.state_id', select: 'name' },
      { path: 'address.district_id', select: 'name' },
      { path: 'address.city_id', select: 'name' },
      { path: 'address.area_id', select: 'name' },
      { path: 'address.area_id', select: 'name' },
      { path: 'price_label' },
    ];
    const d = await otherHelper.getquerySendResponse(myRequestSch, page, size, sortQuery, searchQuery, selectQuery, next, populate);
    return otherHelper.paginationSendResponse(res, httpStatus.OK, true, d.data || [], 'All Public Request', page, size, d.totaldata);
  } catch (err) {
    next(err);
  }
};

myRequestController.GetAllRequest = async (req, res, next) => {
  try {
    let page;
    let size;
    let searchQuery;
    let sortQuery = '-_id';
    let selectQuery;
    let populate;
    const size_default = 10;
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
      let sortField = req.query.sort.slice(1);
      let sortBy = req.query.sort.charAt(0);
      if (sortBy == 1 && !isNaN(sortBy)) {
        // 1 is for ascending
        sortQuery = sortField;
      } else if (sortBy == 0 && !isNaN(sortBy)) {
        //0 is for descending
        sortQuery = '-' + sortField;
      } else {
        sortQuery = '-_id';
      }
    }
    searchQuery = { is_deleted: false };
    if (req.query.find_name) {
      searchQuery = {
        name: { $regex: req.query.find_name, $options: 'i' },
        ...searchQuery,
      };
    }
    if (req.query.find_purpose) {
      searchQuery = { purpose: { $regex: req.query.find_purpose, $options: 'i' }, ...searchQuery };
    }
    if (req.query.find_added_at) {
      searchQuery = { added_at: { $regex: req.query.find_added_at, $options: 'i' }, ...searchQuery };
    }

    selectQuery = 'name email message added_at updated_at ';
    populate = [
      { path: 'purpose', select: { title: 1, _id: 0 } },
      { path: 'added_by', select: { name: 1, _id: 0 } },
      { path: 'address.state_id', select: 'name' },
      { path: 'address.district_id', select: 'name' },
      { path: 'address.city_id', select: 'name' },
      { path: 'address.area_id', select: 'name' },

    ];
    console.log(sortQuery);
    let myRequests = await otherHelper.getquerySendResponse(myRequestSch, page, size, sortQuery, searchQuery, selectQuery, next, populate);
    return otherHelper.paginationSendResponse(res, httpStatus.OK, true, myRequests.data, myRequestConfig.gets, page, size, myRequests.totaldata);
  } catch (err) {
    next(err);
  }
};
myRequestController.DeleteMyRequest = async (req, res, next) => {
  try {
    const id = req.params.id;
    const delMyRequest = await myRequestSch.findByIdAndUpdate(id, { $set: { is_deleted: true, deleted_at: new Date() } });
    return otherHelper.sendResponse(res, httpStatus.OK, true, delMyRequest, null, 'myRequest delete success!!', null);
  } catch (err) {
    next(err);
  }
};

myRequestController.ApproveMyRequest = async (req, res, next) => {
  try {
    const id = req.body.id;
    const status = req.body.status
    const delMyRequest = await myRequestSch.findByIdAndUpdate(id, { $set: { is_approved: status } }, { new: true });
    return otherHelper.sendResponse(res, httpStatus.OK, true, delMyRequest, null, 'myRequest delete success!!', null);
  } catch (err) {
    next(err);
  }
};
module.exports = myRequestController;
