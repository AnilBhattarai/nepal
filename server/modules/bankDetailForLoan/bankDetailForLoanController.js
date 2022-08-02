const httpStatus = require('http-status');
const otherHelper = require('../../helper/others.helper');
const bankDetailForLoanConfig = require('./bankDetailForLoanConfig');
const bankDetailForLoanSch = require('./bankDetailForLoanSchema');

const bankDetailForLoancontroller = {};

bankDetailForLoancontroller.getBankDetailForLoan = async (req, res, next) => {
  try {
    let { page, size, populate, selectQuery, searchQuery, sortQuery } = otherHelper.parseFilters(req, 10, false);
    if (req.query.find_name) {
      searchQuery = { Bank_Name: { $regex: req.query.find_name, $options: 'i' }, ...searchQuery };
    }
    let bankDetailForLoan = await otherHelper.getquerySendResponse(bankDetailForLoanSch, page, size, sortQuery, searchQuery, selectQuery, next, populate);
    return otherHelper.paginationSendResponse(res, httpStatus.OK, true, bankDetailForLoan.data, bankDetailForLoanConfig.get, page, size, bankDetailForLoan.totaldata);
    // let searchQuery={is_deleted:false}
    // const data = await bankDetailForLoanSch.find(searchQuery);
    // return otherHelper.sendResponse(res,httpStatus.OK,true,data,null,bankDetailForLoanConfig.get,null);
  } catch (err) {
    next(err);
  }
};

bankDetailForLoancontroller.saveBankDetailForLoan = async (req, res, next) => {
  try {
    const data = req.body;
    if (req.file) {
      req.file.destination = req.file.destination.split('\\').join('/').split('server/')[1] + '/';
      req.file.path = req.file.path.split('\\').join('/').split('server/')[1];
    }
    if (data && data._id) {
      if (req.file) {
        data.Logo = req.file;
      }
      data.updated_by = req.user.id;
      data.updated_at = new Date();
      const update = await bankDetailForLoanSch.findByIdAndUpdate(data._id, { $set: data }, { new: true });
      return otherHelper.sendResponse(res, httpStatus.OK, true, update, null, bankDetailForLoanConfig.save, null);
    } else {
      data.Logo = req.file;
      data.added_by = req.user.id;
      const newdata = new bankDetailForLoanSch(data);
      const newdatasave = await newdata.save();
      return otherHelper.sendResponse(res, httpStatus.OK, true, newdatasave, null, bankDetailForLoanConfig.save, null);
    }
  } catch (err) {
    next(err);
  }
};
bankDetailForLoancontroller.getBankDetailForLoanDetail = async (req, res, next) => {
  try {
    const id = req.params.id;
    const getDetail = await bankDetailForLoanSch.findById(id);
    return otherHelper.sendResponse(res, httpStatus.OK, true, getDetail, null, bankDetailForLoanConfig.get, null);
  } catch (err) {
    next(err);
  }
};

bankDetailForLoancontroller.deleteBankDetailForLoan = async (req, res, next) => {
  try {
    const id = req.params.id;
    const deletes = await bankDetailForLoanSch.findByIdAndUpdate(
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
    return otherHelper.sendResponse(res, httpStatus.OK, true, deletes, null, bankDetailForLoanConfig.delete, null);
  } catch (err) {
    next(err);
  }
};
module.exports = bankDetailForLoancontroller;
