const httpStatus = require('http-status');
const otherHelper = require('../../helper/others.helper');
const searchFilterConfig = require('./searchFilterConfig');
const searchFilterSch = require('./searchFilterSchema');

const searchFilterController = {};

searchFilterController.PostSearchFilter = async (req, res, next) => {
  try {
    let data = req.body;
    if (data._id) {
      let filter = await searchFilterSch.findByIdAndUpdate(id, { $set: data }, { new: true });
      return otherHelper.sendResponse(res, httpStatus.OK, true, filter, null, 'Search Filter Update Success', null);
    } else {
      data.added_by = req.user.id;
      let newFilter = new searchFilterSch(data);
      let filter = await newFilter.save();
      return otherHelper.sendResponse(res, httpStatus.OK, true, filter, null, 'Search Filter Save Success', null);
    }
  } catch (err) {
    next(err);
  }
};
searchFilterController.GetSearchFilter = async (req, res, next) => {
  let { page, size, populate, selectQuery, searchQuery, sortQuery } = otherHelper.parseFilters(req, 10, false);
  searchQuery = { ...searchQuery, added_by: req.user.id };
  let searchFilters = await otherHelper.getquerySendResponse(searchFilterSch, page, size, sortQuery, searchQuery, selectQuery, next, populate);
  return otherHelper.paginationSendResponse(res, httpStatus.OK, true, searchFilters.data, searchFilterConfig.gets, page, size, searchFilters.totaldata);
};

searchFilterController.GetSearchFilterById = async (req, res, next) => {
  const id = req.params.id;
  let searchFilter = await searchFilterSch.findOne({ _id: id, is_deleted: false });
  return otherHelper.sendResponse(res, httpStatus.OK, true, searchFilter, null, searchFilterConfig.get, null);
};
searchFilterController.DeleteSearchFilter = async (req, res, next) => {
  try {
    const id = req.params.id;
    const delSearchFilter = await searchFilterSch.findByIdAndUpdate(id, { $set: { is_deleted: true, deleted_at: new Date() } });
    return otherHelper.sendResponse(res, httpStatus.OK, true, delSearchFilter, null, 'search Filter delete success!!', null);
  } catch (err) {
    next(err);
  }
};
module.exports = searchFilterController;
