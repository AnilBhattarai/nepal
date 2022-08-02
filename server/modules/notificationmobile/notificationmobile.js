const notifimobSch = require('./notificationmobileSchema');
const httpStatus = require('http-status');
const otherHelper = require('../../helper/others.helper');

const notifimobController = {};

notifimobController.postnotification = async (push_token, user_id, next) => {
  try {
    let notification = { push_token: push_token, user_id: user_id };
    const update = await notifimobSch.findOneAndUpdate({ push_token: push_token }, { $set: { user_id: user_id, updated_by: user_id, updated_at: new Date() } });
    if (update) {
      return update;
    } else {
      notification = { ...notification, added_by: user_id, is_active: true };
      const newnotification = new notifimobSch(notification);
      const save = await newnotification.save();
      return save;
    }
  } catch (err) {
    next(err);
  }
};
notifimobController.getUserhavingPushToken = async (req, res, next) => {
  try {
    let data = await notifimobSch.find({ push_token: { $exists: true } }, { _id: 1, user_id: 1 }).populate({ path: 'user_id' });
    // let data = await notifimobSch.find({push_token:{$exists: true}}).populate({path:'user_id'});

    return otherHelper.sendResponse(res, httpStatus.OK, false, data, 'user found', 'user  found', null);
  } catch (err) {
    next(err);
  }
};

module.exports = notifimobController;
