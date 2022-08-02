const httpStatus = require('http-status');
const otherHelper = require('../../helper/others.helper');
const contactSch = require('./contactagentSchema');
const renderMail = require('./../template/templateController').internal;
const emailHelper = require('./../../helper/email.helper');
const agencySch = require('../agency/agencySchema');
const userSch = require('../user/userSchema');
const leadSch = require('../lead/leadSchema');
const contactConfig = require('../contactAgent/contactagentConfig');

const contactagentcontroller = {};

contactagentcontroller.sendMessage = async (req, res, next) => {
  try {
    const info = req.body;
    const agency_id = info.agency_id;
    if (info._id) {
      // info.updated_by = req.user.id;
      info.updated_at = new Date();
      const update = await contactSch.findByIdAndUpdate(info._id, { $set: info }, { new: true });
      return otherHelper.sendResponse(res, httpStatus.OK, true, update, null, 'update successfully', null);
    } else {
      // const agents = await userSch.find({ 'agent.agency': info.agency_id }, { email: 1 });
      // for (let i = 0; i < agents.length; i++) {
      const newLead = new leadSch({
        name: info.first_name,
        last_name: info.last_name,
        email: info.email,
        inquiry: info.message,
        channel: 'Contact_Form',
        phone_no: info.phone,
        agency_id: info.agency_id,
        // agent_id: agents[i]._id,
        // agent_assigned_at: new Date()
      });
      const save = await newLead.save();
      //   const data = {
      //     // name: info.first_name,
      //     email: info.email,
      //     msg: info.message,
      //     phone: info.phone,
      //   };
      //   const renderedMail = await renderMail.renderTemplate('contact_to_agency', data, agents[i].email);
      //   if (renderMail.error) {
      //     console.log('render mail error: ', renderMail.error);
      //   } else {
      //     emailHelper.send(renderedMail);
      //   }
      // }
      // info.added_by = req.user.id;
      const newdata = new contactSch(info);
      const newdatasave = await newdata.save();
      if (newdatasave) {
        return otherHelper.sendResponse(res, httpStatus.OK, true, newdatasave, null, 'msg save successfully', null);
      } else {
        return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, 'Bad request', null, null);
      }
    }
  } catch (err) {
    next(err);
  }
};
contactagentcontroller.getAllmessageforadmin = async (req, res, next) => {
  try {
    let { page, size, populate, selectQuery, searchQuery, sortQuery } = otherHelper.parseFilters(req, 10, false);
    populate = { path: 'agency_id' };
    let contacts = await otherHelper.getquerySendResponse(contactSch, page, size, sortQuery, searchQuery, selectQuery, next, populate);
    return otherHelper.paginationSendResponse(res, httpStatus.OK, true, contacts.data, contactConfig.gets, page, size, contacts.totaldata);
  } catch (err) {
    next(err);
  }
};

module.exports = contactagentcontroller;
