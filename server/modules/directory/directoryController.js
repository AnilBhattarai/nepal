const httpStatus = require('http-status');
var objectId = require('mongoose').Types.ObjectId;
const otherHelper = require('../../helper/others.helper');
const contentController = {};
const usersSchema = require('../user/userSchema');
const developerSchema = require('../user/developerSchema');
const agencySchema = require('../agency/agencySchema');
const companySchema = require('../company/companySchema');
const directorySch = require('./directorySchema');
const directoryConfig = require('./directoryConfig');
const internal = {};

contentController.getAutoDirectory = async (req, res, next) => {
  try {
    const builder = await usersSchema.find({ is_deleted: false, 'builder.is_verified': true, email_verified: true, is_active: true }).sort({ name: 1 }).select({ name: 1, 'image.path': 1 });
    const agent = await usersSchema.find({ is_deleted: false, 'agent.is_verified': true, email_verified: true, is_active: true }).sort({ name: 1 }).select({ name: 1, 'image.path': 1 });
    const author = await usersSchema.find({ is_deleted: false, 'author.is_verified': true, email_verified: true, is_active: true }).sort({ name: 1 }).select({ name: 1, 'image.path': 1 });
    const developer = await developerSchema.find({ is_verified: true, is_active: true, is_deleted: false }).sort({ name: 1 }).select({ name: 1, 'logo.path': 1 });
    const agency = await agencySchema.find({ is_approved: true, is_active: true, is_deleted: false }).sort({ title: 1 }).select({ title: 1, 'logo.path': 1 });
    const company = await companySchema.find({ is_active: true, is_deleted: false }).sort({ name: 1 }).select({ name: 1, email: 1, address: 1, phone_no: 1 });
    return otherHelper.sendResponse(res, httpStatus.OK, true, { builder, agent, agency, developer, author, company }, null, null, null);
  } catch (err) {
    next(err);
  }
};

contentController.saveDirectory = async (req, res, next) => {
  try {
    let directory = req.body;
    if (directory && directory._id) {
      directory.updated_at = new Date();
      directory.updated_by = req.user.id;
      const update = await directorySch.findByIdAndUpdate(
        directory._id,
        {
          $set: directory,
        },
        { new: true },
      );
      return otherHelper.sendResponse(res, httpStatus.OK, true, update, null, directoryConfig.save, null);
    } else {
      directory.added_by = req.user.id;
      const new_directory = new directorySch(directory);
      const new_directory_save = await new_directory.save();
      return otherHelper.sendResponse(res, httpStatus.OK, true, new_directory_save, null, directoryConfig.get, null);
    }
  } catch (err) {
    next(err);
  }
};
contentController.getAllDirectory = async (req, res, next) => {
  try {
    let { page, size, populate, selectQuery, searchQuery, sortQuery } = otherHelper.parseFilters(req, 10, false);
    if (req.query.find_name) {
      searchQuery = { name: { $regex: req.query.find_name, $options: 'i' }, ...searchQuery };
    }
    if (req.query.find_email) {
      searchQuery = { email: { $regex: req.query.find_email, $options: 'i' }, ...searchQuery };
    }
    if (req.query.find_phone) {
      searchQuery = { phone: { $regex: req.query.find_phone, $options: 'i' }, ...searchQuery };
    }
    selectQuery = 'phone is_active name email';
    populate = [{ path: 'service_category', select: 'title media.filename' }];
    let contacts = await otherHelper.getquerySendResponse(directorySch, page, size, sortQuery, searchQuery, selectQuery, next, populate);
    return otherHelper.paginationSendResponse(res, httpStatus.OK, true, contacts.data, directoryConfig.gets, page, size, contacts.totaldata);
  } catch (err) {
    next(err);
  }
};
contentController.getDirectory = async (req, res, next) => {
  try {
    const get_directory = await directorySch.aggregate([
      { $match: { is_deleted: false, is_active: true } },
      { $unwind: '$service_category' },
      // {
      //   $group: { _id: '$service_category' },
      // },
    ]);
    return otherHelper.sendResponse(res, httpStatus.OK, true, get_directory, null, directoryConfig.save, null);
  } catch (err) {
    next(err);
  }
};

contentController.deleteDirectory = async (req, res, next) => {
  try {
    const id = req.params.id;
    const delete_directory = await directorySch.findByIdAndUpdate(
      id,
      {
        $set: { is_deleted: true, deleted_at: Date.now(), deleted_by: req.user.id },
      },
      { new: true },
    );
    return otherHelper.sendResponse(res, httpStatus.OK, true, delete_directory, null, directoryConfig.delete, null);
  } catch (err) {
    next(err);
  }
};

contentController.getDirectoryDetail = async (req, res, next) => {
  try {
    const id = req.params.id;
    const directory_detail = await directorySch.findById(id);
    return otherHelper.sendResponse(res, httpStatus.OK, true, directory_detail, null, directoryConfig.get, null);
  } catch (err) {
    next(err);
  }
};
module.exports = contentController;

module.exports = contentController;
