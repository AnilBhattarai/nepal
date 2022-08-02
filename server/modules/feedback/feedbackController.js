const httpStatus = require('http-status');
const otherHelper = require('../../helper/others.helper');
const fedSch = require('./feedbackSchema');
const fedController = {};
const validator = require('validator');

fedController.postFeedback = async (req, res, next) => {
  try {
    const feedback = req.body;
    if (feedback.is_listing_correct == 'false') {
      if (!feedback.reason || feedback.reason.length == 0) {
        return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, feedback, 'please select reason', 'please select reason', null);
      }
    }
    if (feedback && feedback._id) {
      feedback.updated_by = req.user.id;
      feedback.updated_at = Date.now();
      const update = await fedSch.findByIdAndUpdate(feedback._id, { $set: feedback }, { new: true });
      return otherHelper.sendResponse(res, httpStatus.OK, true, update, null, 'feedback updated', null);
    } else {
      feedback.added_by = req.user.id;
      const newFed = new fedSch(feedback);
      const fedSave = await newFed.save();
      return otherHelper.sendResponse(res, httpStatus.OK, true, fedSave, null, 'Feedback Saved', null);
    }
  } catch (err) {
    next(err);
  }
};

fedController.getReviewForAdmin = async (req, res, next) => {
  try {
    let { page, size, sortQuery, searchQuery, selectQuery, populate } = otherHelper.parseFilters(req, 10, false);
    populate = [{ path: 'property_id' }, { path: 'reason', select: 'title' }];
    let allData = await otherHelper.getquerySendResponse(fedSch, page, size, sortQuery, searchQuery, selectQuery, next, populate);
    return otherHelper.paginationSendResponse(res, httpStatus.OK, true, allData.data, 'reviews get successfully', page, size, allData.totaldata);
  } catch (err) {
    next(err);
  }
};

module.exports = fedController;
