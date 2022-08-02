const httpStatus = require('http-status');
const otherHelper = require('../../helper/others.helper');
const developerSch = require('./developerSchema');
const userSch = require('../user/userSchema');
const emailHelper = require('./../../helper/email.helper');
const renderMail = require('./../template/templateController').internal;
const developerController = {};
const internal = {};

developerController.verify = async (req, res, next) => {
  try {
    const { is_verified, developer_id } = req.body;

    const checkIf = await developerSch.findOne({ _id: developer_id });
    if (!checkIf) {
      return otherHelper.sendResponse(res, httpStatus.NOT_FOUND, false, null, null, 'No Developer information !!', null);
    }
    if (checkIf.is_verified == true && is_verified == true) {
      return otherHelper.sendResponse(res, httpStatus.CONFLICT, false, null, null, 'Developer has been already verified !!', null);
    }

    const user = await developerSch.findOne({ _id: developer_id }).select('added_by');

    const email = await userSch.findOne({ _id: user.added_by }).select('email name');

    if (is_verified == true) {
      const developer = await developerSch.findOneAndUpdate(
        { _id: developer_id },
        {
          $set: { is_verified: is_verified, verified_at: Date.now(), verified_by: req.user.id },
        },
        { new: true },
      );

      const roleAssign = await userSch.findOneAndUpdate(
        { _id: user.added_by },
        {
          $push: { roles: '5dd78e9548c5251a14ae830a' },
        },
        { new: true },
      );

      const renderedMail = await renderMail.renderTemplate(
        'verify_developer',
        {
          name: email.name,
          email: email.email,
        },
        email.email,
      );

      if (renderedMail.error) {
        console.log('render mail error: ', renderMail.error);
      } else {
        emailHelper.send(renderedMail);
      }
      return otherHelper.sendResponse(res, httpStatus.OK, true, developer, null, 'Verification Success !!', null);
    }
    if (is_verified == false) {
      const developer = await developerSch.findOneAndUpdate(
        { _id: developer_id },
        {
          $set: { is_verified: is_verified, verified_at: Date.now(), verified_by: req.user.id },
        },
        { new: true },
      );

      const roleAssign = await userSch.findOneAndUpdate(
        { _id: user.added_by },
        {
          $pull: { roles: '5dd78e9548c5251a14ae830a' },
        },
        { new: true },
      );

      const renderedMail = await renderMail.renderTemplate(
        'unverify_developer',
        {
          name: email.name,
          email: email.email,
        },
        email.email,
      );

      if (renderedMail.error) {
        console.log('render mail error: ', renderMail.error);
      } else {
        emailHelper.send(renderedMail);

        return otherHelper.sendResponse(res, httpStatus.OK, true, developer, null, 'Unverification Success !!', null);
      }
    }
  } catch (err) {
    next(err);
  }
};

module.exports = developerController;
