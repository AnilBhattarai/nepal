const httpStatus = require('http-status');
const bugSch = require('./bugSchema');
const bugHelper = require('../../helper/error.helper');
const otherHelper = require('../../helper/others.helper');
const { assignPage, assignSize, assignQuerySort } = require('../../helper/module.helper');
const bugController = {};

bugController.AddErrorToLogs = async (req, res, next, err) => {
  const is_already = await bugSch.findOne({ error_message: err.message });
  if (is_already) {
    await bugSch.findOneAndUpdate({ error_message: err.message }, { $set: { count: is_already.count + 1, last_added_at: Date.now(), added_by: req.user && req.user.id } }, { new: true });
    return;
  }
  const errObj = bugHelper.getErrorObj(err, next);
  errObj.added_by = req.user && req.user.id;
  errObj.device = req.device;
  errObj.ip = req.client_ip_address;
  errObj.last_device = req.device;
  errObj.last_ip = req.client_ip_address;
  errObj.last_at = new Date();
  const findAlready = await bugSch.findOne({ error_stack: errObj.error_stack });
  if (findAlready) {
    return await bugSch.findByIdAndUpdate(findAlready._id, { $set: { last_device: errObj.last_device, last_ip: errObj.last_ip, last_at: errObj.last_at, count: findAlready.count + 1 } }, { new: true });
  } else {
    const bug = await bugSch(errObj);
    return bug.save();
  }
};
bugController.GetErrors = async (req, res, next) => {
  try {
    let { page, size, populate, selectQuery, searchQuery, sortQuery } = otherHelper.parseFilters(req, 10, false);
    selectQuery = 'error_message error_stack error_type added_at added_by device ip is_deleted last_at last_ip last_device count';
    if (req.query.find_errors) {
      searchQuery = { error_stack: { $regex: req.query.find_errors, $options: 'i' }, ...searchQuery };
    }
    let bugs = await otherHelper.getquerySendResponse(bugSch, page, size, sortQuery, searchQuery, selectQuery, next, populate);
    return otherHelper.paginationSendResponse(res, httpStatus.OK, true, bugs.data, 'Here are the error folks!!', page, size, bugs.totaldata);
  } catch (err) {
    next(err);
  }
};
bugController.GetErrorsGroupBy = async (req, res, next) => {
  try {
    const bugs = await bugSch.aggregate([{ $group: { _id: '$error_type', count: { $sum: 1 } } }, { $sort: { count: -1 } }]);
    let totaldata = 0;
    bugs.forEach((each) => {
      totaldata = totaldata + each.count;
    });
    return otherHelper.paginationSendResponse(res, httpStatus.OK, true, bugs, 'errors by group by get success!!', 1, 1, totaldata);
  } catch (err) {
    next(err);
  }
};
bugController.DeleteError = async (req, res, next) => {
  try {
    const id = req.params.id;
    const del = await bugSch.findByIdAndUpdate(id, { $set: { is_deleted: true } });
    return otherHelper.sendResponse(res, httpStatus.OK, true, del, null, 'bug delete success!', null);
  } catch (err) {
    next(err);
  }
};
bugController.DeleteAll = async (req, res, next) => {
  try {
    const dels = await bugSch.remove({});
    return otherHelper.sendResponse(res, httpStatus.OK, true, null, null, 'all errors deleted!!', null);
  } catch (err) {
    next(err);
  }
};
module.exports = bugController;
