const httpStatus = require('http-status');
const otherHelper = require('../../helper/others.helper');
const leadConfig = require('./leadConfig');
const leadSch = require('./leadSchema');
const mongoose = require('mongoose');
const renderMail = require('./../template/templateController').internal;
const emailHelper = require('./../../helper/email.helper');
const { assignPage, assignSize, assignQuerySort } = require('../../helper/module.helper');

const leadController = {};

leadController.PostLead = async (req, res, next) => {
  try {
    let { name, email, inquiry, channel, phone_no, profile_link, date } = req.body;
    const newLead = new leadSch({ name, email, inquiry, channel, phone_no, profile_link, date, added_by: req.user && req.user.id });
    if (channel == 'Property_Inquiries') {
    }
    if (channel == 'Contact_Form') {
    }
    const lead = await newLead.save();
    if (lead) {
      return otherHelper.sendResponse(res, httpStatus.OK, true, lead, null, leadConfig.save, null);
    } else {
      return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, leadConfig.err, null, null);
    }
  } catch (err) {
    next(err);
  }
};
leadController.AddLeadByAgent = async (req, res, next) => {
  try {
    let { name, email, inquiry, channel, phone_no, profile_link, date } = req.body;
    const newLead = new leadSch({ name, email, inquiry, channel, phone_no, profile_link, date, added_by: req.user && req.user.id, agent_id: req.user && req.user.id });
    const lead = await newLead.save();
    if (lead) {
      return otherHelper.sendResponse(res, httpStatus.OK, true, lead, null, leadConfig.save, null);
    } else {
      return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, leadConfig.err, null, null);
    }
  } catch (err) {
    next(err);
  }
};
leadController.AssignStatusByAgent = async (req, res, next) => {
  try {
    let { _id, status } = req.body;
    const update = await leadSch.findOneAndUpdate({ _id: _id, agent_id: req.user.id }, { $set: { status: status, status_change_at: new Date(), is_assign_by_admin: false } });
    return otherHelper.sendResponse(res, httpStatus.OK, true, update, null, leadConfig.save, null);
  } catch (err) {
    next(err);
  }
};
leadController.AssignAgent = async (req, res, next) => {
  try {
    let { _id, agent_id } = req.body;
    const update = await leadSch.findByIdAndUpdate(_id, { $set: { agent_id: agent_id, agent_assigned_at: new Date(), is_assign_by_admin: true, agent_assigned_by: req.user.id } });
    return otherHelper.sendResponse(res, httpStatus.OK, true, update, null, leadConfig.save, null);
  } catch (err) {
    next(err);
  }
};
leadController.GetLead = async (req, res, next) => {
  let { page, size, populate, selectQuery, searchQuery, sortQuery } = otherHelper.parseFilters(req, 10, false);
  if (req.query.find_name) {
    searchQuery = { name: { $regex: req.query.find_name, $options: 'i' }, ...searchQuery };
  }
  if (req.query.find_channel) {
    searchQuery = { channel: { $regex: req.query.find_channel, $options: 'i' }, ...searchQuery };
  }
  if (req.query.find_email) {
    searchQuery = { email: { $regex: req.query.find_email, $options: 'i' }, ...searchQuery };
  }
  if (req.query.find_phone_no) {
    searchQuery = { phone_no: { $regex: req.query.find_phone_no, $options: 'i' }, ...searchQuery };
  }
  if (req.query.find_added_at) {
    searchQuery = { added_at: { $regex: req.query.find_added_at, $options: 'i' }, ...searchQuery };
  }

  populate = [
    { path: 'agent_id', select: 'name' },
    { path: 'agency_id', select: 'title' },
    { path: 'property_id', select: 'basic.title slug_url' },
  ];
  selectQuery = 'name email inquiry channel phone_no profile_link added_at date  agency_id property_id';
  let leads = await otherHelper.getquerySendResponse(leadSch, page, size, sortQuery, searchQuery, selectQuery, next, populate);
  return otherHelper.paginationSendResponse(res, httpStatus.OK, true, leads.data, leadConfig.gets, page, size, leads.totaldata);
};

leadController.getAgentLead = async (req, res, next) => {
  let { page, size, populate, selectQuery, searchQuery, sortQuery } = otherHelper.parseFilters(req, 10, false);
  searchQuery = { agent_id: mongoose.Types.ObjectId(req.user.id), ...searchQuery };
  const data = await leadSch.aggregate([
    {
      $match: searchQuery,
    },
    {
      $group: { _id: '$channel', amt: { $sum: 1 } },
    },
  ]);
  if (req.query.find_name) {
    searchQuery = { name: { $regex: req.query.find_name, $options: 'i' }, ...searchQuery };
  }
  if (req.query.find_channel) {
    searchQuery = { channel: req.query.find_channel, ...searchQuery };
  }
  if (req.query.find_email) {
    searchQuery = { email: { $regex: req.query.find_email, $options: 'i' }, ...searchQuery };
  }
  if (req.query.find_phone_no) {
    searchQuery = { phone_no: { $regex: req.query.find_phone_no, $options: 'i' }, ...searchQuery };
  }
  if (req.query.find_added_at) {
    searchQuery = { added_at: { $regex: req.query.find_added_at, $options: 'i' }, ...searchQuery };
  }
  populate = [{ path: 'property_id', select: 'slug_url basic.title' }];
  selectQuery = 'name email inquiry channel phone_no profile_link added_at date status is_assign_by_admin';
  let leads = await otherHelper.getquerySendResponse(leadSch, page, size, sortQuery, searchQuery, selectQuery, next, populate);

  return otherHelper.paginationSendResponse(res, httpStatus.OK, true, leads.data, data, page, size, leads.totaldata);
};

leadController.GetLeadById = async (req, res, next) => {
  const id = req.params.id;
  let lead = await leadSch.findOne({ _id: id, is_deleted: false });
  return otherHelper.sendResponse(res, httpStatus.OK, true, lead, null, leadConfig.get, null);
};
leadController.DeleteLead = async (req, res, next) => {
  try {
    const id = req.params.id;
    const delLead = await leadSch.findByIdAndUpdate(id, { $set: { is_deleted: true, deleted_at: new Date() } });
    return otherHelper.sendResponse(res, httpStatus.OK, true, delLead, null, 'lead delete success!!', null);
  } catch (err) {
    next(err);
  }
};
module.exports = leadController;
