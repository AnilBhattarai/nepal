const httpStatus = require('http-status');
const otherHelper = require('../../helper/others.helper');
const contactSch = require('./contactDevSchema');
const renderMail = require('./../template/templateController').internal;
const emailHelper = require('./../../helper/email.helper');
const developerSch = require('../user/developerSchema');
const contactConfig = require('../contactDeveloper/contactDevConfig');

const contactdevelopercontroller = {};

contactdevelopercontroller.sendMessages = async (req, res, next) => {
  try {
    const info = req.body;
    const developer_id = info.developer_id;
    const developer_email = await developerSch.findOne({ _id: developer_id }).select('email');
    if (info._id) {
      // info.updated_by = req.user.id;
      info.updated_at = new Date();
      const update = await contactSch.findByIdAndUpdate(info._id, { $set: info }, { new: true });
      return otherHelper.sendResponse(res, httpStatus.OK, true, update, null, 'update successfully', null);
    } else {
      // info.added_by = req.user.id;
      const newdata = new contactSch(info);
      const newdatasave = await newdata.save();
      if (newdatasave) {
        const data = {
          name: newdatasave.name,
          email: newdatasave.email,
          msg: newdatasave.message,
          phone: newdatasave.phone,
        };
        const renderedMail = await renderMail.renderTemplate('contact_to_developer', data, developer_email);
        if (renderMail.error) {
          console.log('render mail error: ', renderMail.error);
        } else {
          emailHelper.send(renderedMail);
        }

        return otherHelper.sendResponse(res, httpStatus.OK, true, newdatasave, null, 'msg save successfully', null);
      } else {
        return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, 'Bad request', null, null);
      }
    }
  } catch (err) {
    next(err);
  }
};
contactdevelopercontroller.getAllmessageforadmin = async (req, res, next) => {
  try {
    let { page, size, populate, selectQuery, searchQuery, sortQuery } = otherHelper.parseFilters(req, 10, false);
    populate = { path: 'developer_id' };
    let contacts = await otherHelper.getquerySendResponse(contactSch, page, size, sortQuery, searchQuery, selectQuery, next, populate);
    return otherHelper.paginationSendResponse(res, httpStatus.OK, true, contacts.data, contactConfig.gets, page, size, contacts.totaldata);
  } catch (err) {
    next(err);
  }
};
module.exports = contactdevelopercontroller;
