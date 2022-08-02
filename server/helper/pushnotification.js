'use strict';
const apiCallHelper = require('./apicall.helper');
const LoginData = require('../modules/notificationmobile/notificationmobileSchema');
const pushNotificationModel = require('../modules/pushNotification/pushnotificationSchema');
const otherHelper = require('./others.helper');
const httpStatus = require('http-status');
const sendPushNotification = {};
const internal = {};
// send mail with defined transport object

sendPushNotification.sendone = async (req, res, next) => {
  try {
    let list = [];
    const { title, body, userid } = req.body;
    const tokens1 = await LoginData.find({ user_id: userid, push_token: { $exists: true }, is_active: true }).select({ push_token: 1, _id: 0 });
    for (let i = 0; i < tokens1.length; i++) {
      list.push({ title, body, userid, sound: 'default', to: tokens1[i].push_token, ttl: 432000, priority: 'high' });
    }
    const response1 = await apiCallHelper.requestThirdPartyApi(req, 'https://exp.host/--/api/v2/push/send', { 'Content-Type': 'application/json' }, next, 'POST', list);
    await internal.AddNotificationFromData({ request: list, response: response1.data }, next);
    return response1;
  } catch (err) {
    next(err);
  }
};
sendPushNotification.sendSelected = async (req, res, next) => {
  try {
    let all = [];
    let { title, body, user_id } = req.body;
    if (!Array.isArray(user_id)) {
      return otherHelper.sendResponse(res, httpStatus.NOT_ACCEPTABLE, false, null, { userid: 'Must be an Array' }, 'Must be an array', null);
    }
    for (let i = 0; i < user_id.length; i++) {
      const Token = await LoginData.find({ user_id: user_id[i], is_active: true, push_token: { $exists: true } }).select({ push_token: 1, _id: 0 });
      for (let j = 0; j < Token.length; j++) {
        all.push({ title, body, user_id, sound: 'default', to: Token[j].push_token, ttl: 432000, priority: 'high' });
        const response = await apiCallHelper.requestThirdPartyApi(req, 'https://exp.host/--/api/v2/push/send', { 'Content-Type': 'application/json' }, next, 'POST', all);
        await internal.AddNotificationFromData({ title: title, user_id: user_id[i], sound: 'default', to: Token[j].push_token, ttl: 432000, priority: 'high', response: response.data }, next);
        return res.status(200).json(response);
      }
    }
  } catch (err) {
    next(err);
  }
};

internal.AddNotificationFromData = async (data, next) => {
  try {
    let Notifications = data;
    if (Notifications._id) {
      return pushNotificationModel.findByIdAndUpdate(Notifications._id, { $set: Notifications });
    } else {
      let newNotification = new pushNotificationModel(Notifications);
      return newNotification.save();
    }
  } catch (err) {
    next(err);
  }
};
sendPushNotification.sendToAll = async (req, res, next) => {
  try {
    let all = [];

    let { title, body } = req.body;
    let user_id = await LoginData.find({ push_token: { $exists: true }, is_active: true }).select({ user_id: 1, _id: 0 });
    for (let i = 0; i < user_id.length; i++) {
      const Token = await LoginData.find({ user_id: user_id[i].user_id, is_active: true, push_token: { $exists: true } }).select({ push_token: 1, _id: 0 });
      for (let j = 0; j < Token.length; j++) {
        all.push({ title, body, user_id, sound: 'default', to: Token[j].push_token, ttl: 432000, priority: 'high' });
        const response = await apiCallHelper.requestThirdPartyApi(req, 'https://exp.host/--/api/v2/push/send', { 'Content-Type': 'application/json' }, next, 'POST', all);
        await internal.AddNotificationFromData({ title: title, body: body, user_id: user_id[i].user_id, sound: 'default', to: Token[j].push_token, ttl: 432000, priority: 'high', response: response.data }, next);
        return res.status(200).json(response);
      }
    }
  } catch (err) {
    next(err);
  }
};

sendPushNotification.getPushNotificationList = async (req, res, next) => {
  try {
    let { page, size, populate, selectQuery, searchQuery, sortQuery } = otherHelper.parseFilters(req, 10, null);
    if (req.query.find_id) {
      searchQuery = {
        user_id: req.query.find_id,
        ...searchQuery,
      };
    }
    let data = await otherHelper.getquerySendResponse(pushNotificationModel, page, size, sortQuery, searchQuery, selectQuery, next, populate);
    return otherHelper.paginationSendResponse(res, httpStatus.OK, true, data.data, 'notification list succesfull', page, size, data.totaldata);
  } catch (err) {
    next(err);
  }
};

module.exports = sendPushNotification;
