const httpStatus = require('http-status');
const otherHelper = require('../../helper/others.helper');
const companyConfig = require('./companyConfig');
const companySch = require('./companySchema');

const companycontroller = {};

companycontroller.getCompany = async (req, res, next) => {
  try {
    let { page, size, populate, selectQuery, searchQuery, sortQuery } = otherHelper.parseFilters(req, 10, false);
    if (req.query.find_name) {
      searchQuery = {
        name: { $regex: req.query.find_name, $options: 'i' },
        ...searchQuery,
      };
    }
    let company = await otherHelper.getquerySendResponse(companySch, page, size, sortQuery, searchQuery, selectQuery, next, populate);
    return otherHelper.paginationSendResponse(res, httpStatus.OK, true, company.data, companyConfig.get, page, size, company.totaldata);
  } catch (err) {
    next(err);
  }
};

companycontroller.saveCompany = async (req, res, next) => {
  try {
    const data = req.body;
    if (data && data._id) {
      data.updated_by = req.user.id;
      data.updated_at = new Date();
      const update = await companySch.findByIdAndUpdate(data._id, { $set: data }, { new: true });
      return otherHelper.sendResponse(res, httpStatus.OK, true, update, null, companyConfig.save, null);
    } else {
      data.added_by = req.user.id;
      const newdata = new companySch(data);
      const newdatasave = await newdata.save();
      return otherHelper.sendResponse(res, httpStatus.OK, true, newdatasave, null, companyConfig.save, null);
    }
  } catch (err) {
    next(err);
  }
};
companycontroller.getCompanyDetail = async (req, res, next) => {
  try {
    const id = req.params.id;
    const getDetail = await companySch.findById(id);
    return otherHelper.sendResponse(res, httpStatus.OK, true, getDetail, null, companyConfig.get, null);
  } catch (err) {
    next(err);
  }
};

companycontroller.deleteCompany = async (req, res, next) => {
  try {
    const id = req.params.id;
    const deletes = await companySch.findByIdAndUpdate(
      id,
      {
        $set: {
          is_deleted: true,
          deleted_at: new Date(),
          deleted_by: req.user.id,
        },
      },
      { new: true },
    );
    return otherHelper.sendResponse(res, httpStatus.OK, true, deletes, null, companyConfig.delete, null);
  } catch (err) {
    next(err);
  }
};
module.exports = companycontroller;
