const httpStatus = require('http-status');
const otherHelper = require('../../helper/others.helper');
const commentSch = require('./commentSchema');
const blogSch = require('../blog/blogSchema');
const commentController = {};

commentController.PostComment = async (req, res, next) => {
  try {
    const data = req.body;
    data.comment_for = req.params.cmntFor;
    data.post_id = req.params.postId;
    //const   isCommentForAndPostId = await commentSch.findOne({ _id: data._id, added_by: req.user.id });
    if (data._id) {
      data.updated_at = Date.now();
      data.updated_by = req.user.id;
      let searchQuery = {
        $and: [{ _id: data._id, is_deleted: false, added_by: req.user.id, post_id: data.post_id, comment_for: data.comment_for }, { $or: [{ status: 'disapproved' }, { status: 'onhold' }, { status: 'posted' }] }],
      };
      const update = await commentSch.findOneAndUpdate(searchQuery, { $set: data }, { new: true });

      if (update) {
        const updatedComment = await commentSch.findById(update._id).populate({ path: 'added_by', select: 'name' });
        return otherHelper.sendResponse(res, httpStatus.OK, true, updatedComment, null, 'comment edit success!!', null);
      } else {
        return otherHelper.sendResponse(res, httpStatus.NOT_FOUND, false, null, null, 'You are not allowed to edit!!', null);
      }
    } else {
      data.status = 'posted';
      data.added_by = req.user.id;
      const newComment = new commentSch(data);
      const saveComment = await newComment.save();
      const resComment = await commentSch.findById(saveComment._id).populate({ path: 'added_by', select: 'name' });
      return otherHelper.sendResponse(res, httpStatus.OK, true, resComment, null, 'comment added successfully!!', null);
    }
  } catch (err) {
    next(err);
  }
};
commentController.GetCommentByBlog = async (req, res, next) => {
  try {
    const id = req.params.blog;
    const comment = await commentSch
      .find({ blog_id: id, is_deleted: false, status: { $ne: 'disapproved' } })
      .populate({ path: 'added_by', select: 'name' })
      .sort({ _id: -1 });
    const totaldata = comment.length;
    return otherHelper.sendResponse(res, httpStatus.OK, true, { comment, totaldata }, null, 'comment get success!!', null);
  } catch (err) {
    next(err);
  }
};

commentController.GetComment = async (req, res, next) => {
  try {
    let { page, size, populate, selectQuery, searchQuery, sortQuery } = otherHelper.parseFilters(req, 10, false);
    populate = [
      // {
      //   path: 'blog_id',
      //   select: 'title',
      // },
      // {
      //   path: 'forum_id',
      //   select: 'title',
      // },
      {
        path: 'post_id',
        select: 'title basic.title',
      },
      {
        path: 'reply_id',
        select: '_id',
      },
      {
        path: 'added_by',
        select: 'name',
      },
      {
        path: 'added_by',
        select: 'name',
      },
    ];
    // selectQuery = "title  post_id is_approved is_disapproved approved_by disapproved_by approved_at disapproved_at status added_by added_at updated_at updated_by is_deleted replies.reply_text";
    selectQuery = 'title reply_id comment_for status added_by added_at updated_at updated_by is_deleted';

    if (req.query.find_title) {
      searchQuery = {
        title: {
          $regex: req.query.find_title,
          $options: 'i',
        },
        ...searchQuery,
      };
    }
    // if (req.query.find_blog_id) {
    //   const blog = await blogSch.find({ title: { $regex: req.query.find_blog_id, $options: 'i' } }).select({ _id: 1 });
    //   const blogId = blog.map(each => each._id);
    //   searchQuery = {
    //     blog_id: { $in: blogId },
    //     ...searchQuery,
    //   };
    // }

    if (req.query.find_cmnt_for) {
      const comment_for = await commentSch.find({ comment_for: req.query.find_cmnt_for });
      if (comment_for && req.query.find_title) {
        searchQuery = {
          title: { $regex: req.query.find_title, $options: 'i' },
          ...searchQuery,
        };
      }
      if (comment_for && req.query.find_cmnt_status) {
        searchQuery = {
          status: req.query.find_cmnt_status,
          ...searchQuery,
        };
      }
      // const blogId = comment_for.map(each => each._id);
      searchQuery = {
        comment_for: req.query.find_cmnt_for,
        ...searchQuery,
      };
    }
    if (req.query.find_blog_id) {
      const blog = await blogSch.find({ title: { $regex: req.query.find_blog_id, $options: 'i' } }).select({ _id: 1 });
      const blogId = blog.map((each) => each._id);
      searchQuery = {
        blog_id: { $in: blogId },
        ...searchQuery,
      };
    } else {
      if (req.query.find_title) {
        searchQuery = {
          title: { $regex: req.query.find_title, $options: 'i' },
          ...searchQuery,
        };
      }
      if (req.query.find_cmnt_status) {
        searchQuery = {
          status: req.query.find_cmnt_status,
          ...searchQuery,
        };
      }
    }
    let comments = await otherHelper.getquerySendResponse(commentSch, page, size, sortQuery, searchQuery, selectQuery, next, populate);
    return otherHelper.paginationSendResponse(res, httpStatus.OK, true, comments.data, 'comments get success!!', page, size, comments.totaldata);
  } catch (err) {
    next(err);
  }
};

commentController.GetCommentBycmntFor = async (req, res, next) => {
  try {
    const comment_for = req.params.cmntFor;
    const comment = await commentSch
      .find({ comment_for: comment_for, is_deleted: false })
      .select(' _id post_id  status  added_at title replies.reply_text')
      .populate([
        { path: 'added_by', select: 'name' },
        { path: 'reply.added_by', select: { name: 1, _id: 0 } },
      ])
      .sort({ _id: -1 });
    if (comment) {
      const totaldata = comment.length;
      return otherHelper.sendResponse(res, httpStatus.OK, true, { comment, totaldata }, null, `comment by ${comment_for} get successfully`, null);
    } else {
      return otherHelper.sendResponse(res, httpStatus.NOT_FOUND, false, null, null, 'something went wrong', null);
    }
  } catch (err) {
    next(err);
  }
};
commentController.GetCommentPublicyBycmntForPostId = async (req, res, next) => {
  try {
    const comment_for = req.params.cmntFor;
    const post_id = req.params.postId;
    const comment = await commentSch.find({ post_id: post_id, comment_for: comment_for, is_deleted: false, status: 'approved' }).populate({ path: 'added_by', select: 'name' }).select('added_at _id  title status replies.reply_text').sort({ _id: -1 });
    if (comment) {
      const totaldata = comment.length;
      return otherHelper.sendResponse(res, httpStatus.OK, true, { comment, totaldata }, null, 'comment get success!!', null);
    } else {
      return otherHelper.sendResponse(res, httpStatus.NOT_FOUND, false, null, null, 'something went wrong', null);
    }
  } catch (err) {
    next(err);
  }
};
commentController.GetOwnCommentBycmntForPostId = async (req, res, next) => {
  try {
    const comment_for = req.params.cmntFor;
    const post_id = req.params.postId;
    let searchQuery = {
      $and: [
        {
          is_deleted: false,
          // added_by: req.user.id,
          post_id: post_id,
          comment_for: comment_for,
        },
        { $or: [{ status: 'disapproved' }, { added_by: req.user.id }] },
      ],
    };
    const comment = await commentSch.find(searchQuery).populate({ path: 'added_by', select: 'name' }).select('added_at _id  title replies.reply_text status').sort({ _id: -1 });
    if (comment) {
      const totaldata = comment.length;
      return otherHelper.sendResponse(res, httpStatus.OK, true, { comment, totaldata }, null, 'comment get success!!', null);
    } else {
      return otherHelper.sendResponse(res, httpStatus.NOT_FOUND, false, null, null, 'something went wrong', null);
    }
  } catch (err) {
    next(err);
  }
};
commentController.DeleteComment = async (req, res, next) => {
  try {
    const id = req.params.id;
    const comment = await commentSch.findOneAndUpdate({ _id: id, is_deleted: false }, { $set: { is_deleted: true, deleted_at: Date.now() } }, { new: true });
    return otherHelper.sendResponse(res, httpStatus.OK, true, comment, null, 'comment delete success!!', null);
  } catch (err) {
    next(err);
  }
};
commentController.GetCommentById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const comment = await commentSch.findOne({ _id: id, is_deleted: false }).populate([
      { path: 'blog_id', select: 'title' },
      { path: 'added_by', select: 'name' },
      { path: 'forum_id', select: { question: 1, _id: 0 } },
      { path: 'added_by', select: 'name' },
    ]);
    return otherHelper.sendResponse(res, httpStatus.OK, true, comment, null, 'comment get success!!', null);
  } catch (err) {
    next(err);
  }
};
commentController.GetOwnComments = async (req, res, next) => {
  try {
    const size_default = 10;
    let page;
    let size;
    let sortQuery;
    let searchQuery;
    let populate;
    let selectQuery;
    if (req.query.page && !isNaN(req.query.page) && req.query.page != 0) {
      page = Math.abs(req.query.page);
    } else {
      page = 1;
    }
    if (req.query.size && !isNaN(req.query.size) && req.query.size != 0) {
      size = Math.abs(req.query.size);
    } else {
      size = size_default;
    }
    if (req.query.sort) {
      let sortfield = req.query.sort.slice(1);
      let sortby = req.query.sort.charAt(0);
      if (sortby == 1 && !isNaN(sortby) && sortfield) {
        //one is ascending
        sortQuery = sortfield;
      } else if (sortby == 0 && !isNaN(sortby) && sortfield) {
        //zero is descending
        sortQuery = '-' + sortfield;
      } else {
        sortQuery = '';
      }
    }
    populate = [
      {
        path: 'blog_id',
        select: 'title slug_url',
      },
    ];
    selectQuery = 'title blog_id added_by added_at';

    searchQuery = {
      is_deleted: false,
      added_by: req.user.id,
    };

    let ownComments = await otherHelper.getquerySendResponse(commentSch, page, size, sortQuery, searchQuery, selectQuery, next, populate);
    return otherHelper.paginationSendResponse(res, httpStatus.OK, true, ownComments.data, 'own comments get success!!', page, size, ownComments.totaldata);
  } catch (err) {
    next(err);
  }
};

commentController.GetOwnCommentDetailBycmntForPostId = async (req, res, next) => {
  try {
    const comment_for = req.params.cmntFor;
    const post_id = req.params.postId;
    const id = req.params.id;
    let searchQuery = {
      $and: [{ comment_for: comment_for, post_id: post_id, is_deleted: false, added_by: req.user.id, _id: id }, { $or: [{ status: 'disapproved' }, { status: 'onhold' }, { status: 'posted' }] }],
    };
    let populate = [
      { path: 'post_id', select: 'title' },
      { path: 'added_by', select: 'name' },
    ];
    const comment = await commentSch.findOne(searchQuery).populate(populate);
    return otherHelper.sendResponse(res, httpStatus.OK, true, comment, null, 'comment get success!!', null);
  } catch (err) {
    next(err);
  }
};
commentController.ApproveComment = async (req, res, next) => {
  try {
    const details = req.body;
    // if (details.is_approved && !details.is_onhold) {
    //   details.approved_by = req.user.id;
    //   details.approved_at = Date.now();
    //   details.status = 'approved';
    //   details.is_onhold = false;

    // } else if (details.is_onhold && !details.is_approved) {
    //   details.status = 'onhold';
    //   details.is_approved = false;
    //   details.is_onhold = true;
    // } else if (details.is_onhold == null && details.is_approved == null) {
    //   details.status = 'onhold';
    //   details.is_onhold = true;
    // } else {
    //   details.disapproved_by = req.user.id;
    //   details.disapproved_at = Date.now();
    //   details.status = 'disapproved';
    //   details.is_approved = false;
    // }
    details.history && delete details.history;
    const history = {
      action_by: req.user.id,
      action_at: Date.now(),
      change: details.status,
    };
    const forums = await commentSch.findOneAndUpdate(
      { _id: details._id, is_deleted: false },
      {
        $set: details,
        $push: {
          history: history,
        },
      },
      { new: true },
    );
    if (forums) {
      return otherHelper.sendResponse(res, httpStatus.OK, true, forums, null, `${details.status} success!!`, null);
    } else {
      return otherHelper.sendResponse(res, httpStatus.NOT_FOUND, false, null, null, ' unsuccess!!', null);
    }
  } catch (err) {
    next(err);
  }
};
// commentController.DisApproveComment = async (req, res, next) => {
//   try {
//     const data = req.body;
//     data.disapproved_by = req.user.id;
//     data.disapproved_at = Date.now();
//     data.status = 'disapproved';
//     const comment = await commentSch.findOneAndUpdate({ _id: data.id, is_deleted: false }, { $set: data }, { new: true });
//     return otherHelper.sendResponse(res, httpStatus.OK, true, comment, null, 'comment disapprove success!!', null);
//   } catch (err) {
//     next(err);
//   }
// };
commentController.PostReply = async (req, res, next) => {
  try {
    // const comment_id = req.params.id;
    let replyObj = req.body;
    replyObj.added_by = req.user.id;
    replyObj.added_at = Date.now();
    const id = req.params.id;
    const data = req.body;
    if (data._id) {
      data.updated_at = Date.now();
      const update = await commentSch.findOneAndUpdate({ 'replies._id': data._id }, { $set: { 'replies.$': data } }, { new: true }).lean();

      if (update) {
        const d = update.replies.find((x) => x._id == data._id);
        update.replies = d;
        return otherHelper.sendResponse(res, httpStatus.OK, true, update, null, 'reply updated successfully!!', null);
      } else {
        return otherHelper.sendResponse(res, httpStatus.NOT_FOUND, false, null, null, 'You are not allowed to edit!!', null);
      }
    } else {
      data.replied_by = req.user.id;
      data.replied_at = Date.now();
      const newreply = await commentSch.findOneAndUpdate({ _id: id, is_deleted: false }, { $push: { replies: data } }, { new: true, upsert: true });
      if (newreply) {
        return otherHelper.sendResponse(res, httpStatus.OK, true, newreply, null, 'reply added successfully!!', null);
      } else {
        return otherHelper.sendResponse(res, httpStatus.NOT_FOUND, false, null, null, 'You are not allowed to edit!!', null);
      }
    }
  } catch (err) {
    next(err);
  }
};
commentController.GetReplyByComment = async (req, res, next) => {
  try {
    let populateq = [
      { path: 'replies.replied_by', select: 'name' },
      { path: 'history.action_by', select: { name: 1 } },
    ];
    const id = req.params.id; //comment id
    let searchQuery = { _id: id, is_deleted: false, status: 'approved' };
    const comment = await commentSch.find(searchQuery).populate(populateq).select('replies.replied_at replies.reply_text ').sort({ _id: -1 });

    return otherHelper.sendResponse(res, httpStatus.OK, true, ...comment, null, 'reply get success!!', null);
  } catch (err) {
    next(err);
  }
};

commentController.listofcommentVerify = async (req, res, next) => {
  try {
    let { listed_id, details } = req.body;
    const history = {
      action_by: req.user.id,
      action_at: Date.now(),
      change: details.status,
    };
    let cmnt;
    for (let i = 0; i < listed_id.length; i++) {
      cmnt = await commentSch.findOneAndUpdate(
        { _id: listed_id[i], is_deleted: false },
        {
          $set: details,
          $push: {
            history: history,
          },
        },
        { new: true },
      );
    }

    return otherHelper.sendResponse(res, httpStatus.OK, true, cmnt, null, `${details.status} success!!`, null);
  } catch (err) {
    next(err);
  }
};
commentController.DisApproveComment = async (req, res, next) => {
  try {
    const data = req.body;
    const comments = [];
    if (data && data.length > 0) {
      for (let i = 0; i < data.length; i++) {
        let update = {};
        update = await commentSch.findOneAndUpdate({ _id: data[i], is_deleted: false }, { $set: { is_disapproved: true, is_approved: false, disapproved_by: req.user.id, disapproved_at: Date.now(), status: 'disapproved' } }, { new: true });
        comments.push(update);
      }
      return otherHelper.sendResponse(res, httpStatus.OK, true, comments, null, 'comment disapprove success!!', null);
    } else {
      return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, 'invalid data', 'data not selected for disapprove!!', null);
    }
  } catch (err) {
    next(err);
  }
};

module.exports = commentController;
