const httpStatus = require('http-status');
const otherHelper = require('../../helper/others.helper');
const subscribeSch = require('./subscribeSchema');
const mailHelper = require('../../helper/email.helper');
const renderMail = require('../template/templateController').internal;
const subscribeController = {};

subscribeController.GetSubscribe = async (req, res, next) => {
  try {
    let { page, size, populate, selectQuery, searchQuery, sortQuery } = otherHelper.parseFilters(req, 10, false);
    selectQuery = 'email is_subscribed added_at is_deleted';
    searchQuery = {
      is_subscribed: true,
      ...searchQuery,
    };
    if (req.query.find_email) {
      searchQuery = {
        email: {
          $regex: req.query.find_email,
          $options: 'i',
        },
        ...searchQuery,
      };
    }
    let subscriber = await otherHelper.getquerySendResponse(subscribeSch, page, size, sortQuery, searchQuery, selectQuery, next, populate);
    return otherHelper.paginationSendResponse(res, httpStatus.OK, true, subscriber.data, 'subscriber get successful!!', page, size, subscriber.totaldata);
  } catch (err) {
    next(err);
  }
};
subscribeController.SaveSubscribe = async (req, res, next) => {
  try {
    let subscriber = req.body;
    const subscribeMail = await renderMail.renderTemplate('user_subscribe', { email: subscriber.email }, subscriber.email);
    if (subscribeMail.error) {
      console.log('render mail error: ', subscribeMail.error);
    } else {
      mailHelper.send(subscribeMail);
    }
    subscriber.is_subscribed = true;
    const newSubscribe = new subscribeSch(subscriber);
    const subscriberSave = await newSubscribe.save();
    return otherHelper.sendResponse(res, httpStatus.OK, true, subscriberSave, null, 'subscriber save successful!!', null);
  } catch (err) {
    next(err);
  }
};
subscribeController.GetSubscribeById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const subscriber = await subscribeSch.findOne({ _id: id, is_subscribed: true });
    return otherHelper.sendResponse(res, httpStatus.OK, true, subscriber, null, 'subscriber detail get successful!!', null);
  } catch (err) {
    next(err);
  }
};
subscribeController.DeleteSubscribe = async (req, res, next) => {
  try {
    const id = req.params.id;
    const delSubscriber = await subscribeSch.findByIdAndUpdate(id, { $set: { is_deleted: true, deleted_at: new Date() } });
    return otherHelper.sendResponse(res, httpStatus.OK, true, delSubscriber, null, 'subscriber delete successful!!', null);
  } catch (err) {
    next(err);
  }
};
module.exports = subscribeController;
