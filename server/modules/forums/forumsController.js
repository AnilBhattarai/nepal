const comment = require('../comment/commentSchema');
const forumSch = require('./forumsPostSchema');
const forumsConfig = require('./forumsConfig');
const otherHelper = require('../../helper/others.helper');
const httpStatus = require('http-status');
const { assignPage, assignSize, assignQuerySort } = require('../../helper/module.helper');
const forumsController = {};
// forumsController.getForums = async (req, res, next) => {
//   try {
//     const size_default = 10;
//     let page;
//     let size;
//     let sortQuery = "";
//     let searchQuery;
//     let populate;
//     let selectQuery;

//     // let page =  assignPage(req.query.page);
//     if (req.query.page && !isNaN(req.query.page) && req.query.page != 0) {
//       page = Math.abs(req.query.page);
//     } else {
//       page = 1;
//     }

//     // let size = assignSize(req.query.size);
//     if (req.query.size && !isNaN(req.query.size) && req.query.size != 0) {
//       size = Math.abs(req.query.size);
//     } else {
//       size = size_default;
//     }

//     //     let sortQuery = assignQuerySort(req.query.sort);
//     if (req.query.sort) {
//       let sortfield = req.query.sort.slice(1);
//       let sortby = req.query.sort.charAt(0);
//       if (sortby == 1 && !isNaN(sortby) && sortfield) {
//         //one is ascending
//         sortQuery = sortfield;
//       } else if (sortby == 0 && !isNaN(sortby) && sortfield) {
//         //zero is descending
//         sortQuery = "-" + sortfield;
//       } else {
//         sortQuery = "";
//       }
//     }
//     populate = [
//       { path: "updated_by", select: { name: 1 } },
//       { path: "added_by", select: { name: 1 } }
//     ];

//     selectQuery = "title description added_at updated_at";
//     searchQuery = {
//       is_deleted: false,
//       is_active: true,
//       is_approved: true
//     };
//     if (req.query.find_forum) {
//       searchQuery = {
//         title: {
//           $regex: req.query.find_forum,
//           $options: "i"
//         },
//         ...searchQuery
//       };
//     }
//     if (req.query.find_added_at) {
//       searchQuery = {
//         added_at: {
//           $regex: req.query.find_added_at,
//           $options: "i"
//         },
//         ...searchQuery
//       };
//     }
//     let forums = await otherHelper.getquerySendResponse(
//       forumsPost,
//       page,
//       size,
//       sortQuery,
//       searchQuery,
//       selectQuery,
//       next,
//       populate
//     );

//     return otherHelper.paginationSendResponse(
//       res,
//       httpStatus.OK,
//       true,
//       forums.data,
//       forumsConfig.get,
//       page,
//       size,
//       forums.totaldata
//     );
//   } catch (err) {
//     next(err);
//   }
// };

//
forumsController.getForums = async (req, res, next) => {
  try {
    let populate = [
      { path: 'updated_by', select: { name: 1 } },
      { path: 'added_by', select: { name: 1 } },
    ];

    let selectQuery = 'title description status published_on updated_at added_at';
    let searchQuery = {
      is_deleted: false,
      is_active: true,
      status: 'approved',
    };
    let forumsResult = await callGetForums(req, res, next, searchQuery, populate, selectQuery);
    return forumsResult;
  } catch (err) {
    next(err);
  }
};
//

forumsController.getForumsByAdmin = async (req, res, next) => {
  try {
    let searchQuery = {
      is_deleted: false,
    };
    // if (req.query.find_forum_title) {
    //         searchQuery = {
    //           title: {
    //             $regex: req.query.find_forum_title,
    //             $options: "i"
    //           },
    //           ...searchQuery
    //         };
    //       }
    if (req.query.status) {
      searchQuery = {
        status: req.query.status,
        ...searchQuery,
      };
    }
    let populate = [
      { path: 'updated_by', select: { name: 1 } },
      { path: 'added_by', select: { name: 1 } },
      { path: 'history.action_by', select: { name: 1 } },
    ];

    let selectQuery = '';

    let forumsResult = await callGetForums(req, res, next, searchQuery, populate, selectQuery);
    return forumsResult;
  } catch (err) {
    next(err);
  }
};

// forumsController.getForumsByAdmin = async (req, res, next) => {
//   try {
//     const size_default = 10;
//     let page;
//     let size;
//     let sortQuery = "";
//     let searchQuery;
//     let populate;
//     let selectQuery;

//     // let page =  assignPage(req.query.page);
//     if (req.query.page && !isNaN(req.query.page) && req.query.page != 0) {
//       page = Math.abs(req.query.page);
//     } else {
//       page = 1;
//     }

//     // let size = assignSize(req.query.size);
//     if (req.query.size && !isNaN(req.query.size) && req.query.size != 0) {
//       size = Math.abs(req.query.size);
//     } else {
//       size = size_default;
//     }

//     //     let sortQuery = assignQuerySort(req.query.sort);
//     if (req.query.sort) {
//       let sortfield = req.query.sort.slice(1);
//       let sortby = req.query.sort.charAt(0);
//       if (sortby == 1 && !isNaN(sortby) && sortfield) {
//         //one is ascending
//         sortQuery = sortfield;
//       } else if (sortby == 0 && !isNaN(sortby) && sortfield) {
//         //zero is descending
//         sortQuery = "-" + sortfield;
//       } else {
//         sortQuery = "";
//       }
//     }
//     populate = [
//       { path: "updated_by", select: { name: 1, } },
//       { path: "added_by", select: { name: 1, } }
//     ];

//     selectQuery = "";
//     searchQuery = {
//       is_deleted: false,
//       is_active: true,
//     };
//     if (req.query.find_forum) {
//       searchQuery = {
//         title: {
//           $regex: req.query.find_forum,
//           $options: "i"
//         },
//         ...searchQuery
//       };
//     }
//     if (req.query.find_added_at) {
//       searchQuery = {
//         added_at: {
//           $regex: req.query.find_added_at,
//           $options: "i"
//         },
//         ...searchQuery
//       };
//     }
//     let forums = await otherHelper.getquerySendResponse(
//       forumsPost,
//       page,
//       size,
//       sortQuery,
//       searchQuery,
//       selectQuery,
//       next,
//       populate
//     );

//     return otherHelper.paginationSendResponse(
//       res,
//       httpStatus.OK,
//       true,
//       forums.data,
//       forumsConfig.get,
//       page,
//       size,
//       forums.totaldata
//     );
//   } catch (err) {
//     next(err);
//   }
// };
///

let callGetForums = async (req, res, next, searchQuery, populate, selectQuery) => {
  try {
    const size_default = 10;
    let page;
    let size;
    let sortQuery;
    //let page = assignPage(req.query.page) ? assignPage(req.query.page) : 1;
    if (req.query.page && !isNaN(req.query.page) && req.query.page != 0) {
      page = Math.abs(req.query.page);
    } else {
      page = 1;
    }

    //let size = assignSize(req.query.size) ? assignSize(req.query.size) : size_default;
    if (req.query.size && !isNaN(req.query.size) && req.query.size != 0) {
      size = Math.abs(req.query.size);
    } else {
      size = size_default;
    }

    // let sortQuery = assignQuerySort(req.query.sort) ? assignQuerySort(req.query.sort) : '-1';
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
        sortQuery = '-1';
      }
    } else {
      sortQuery = { _id: -1 };
    }

    if (req.query.find_forum) {
      searchQuery = {
        title: {
          $regex: req.query.find_forum,
          $options: 'i',
        },
        ...searchQuery,
      };
    }
    // if (req.query.status) {
    //   searchQuery = {
    //     status: req.query.status,
    //     ...searchQuery,
    //   };
    // }
    if (req.query.find_added_at) {
      searchQuery = {
        added_at: {
          $regex: req.query.find_added_at,
          $options: 'i',
        },
        ...searchQuery,
      };
    }
    let forums = await otherHelper.getquerySendResponse(forumSch, page, size, sortQuery, searchQuery, selectQuery, next, populate);

    return otherHelper.paginationSendResponse(res, httpStatus.OK, true, forums.data, forumsConfig.get, page, size, forums.totaldata);
  } catch (err) {
    next(err);
  }
};
///
forumsController.getForumsByUser = async (req, res, next) => {
  try {
    let populate = [
      { path: 'updated_by', select: { name: 1, _id: 1 } },
      { path: 'added_by', select: { name: 1, _id: 1 } },
      { path: 'history.action_by', select: { name: 1 } },
    ];
    let selectQuery = '';
    let searchQuery = {
      $and: [{ is_deleted: false, is_active: true, added_by: req.user.id }, { $or: [{ status: 'disapproved' }, { status: 'onhold' }, { status: 'posted' }] }],
    };
    let forumsResult = await callGetForums(req, res, next, searchQuery, populate, selectQuery);
    return forumsResult;
  } catch (err) {
    next(err);
  }
};
//
// forumsController.getForumsByUser = async (req, res, next) => {
//   try {
//     const size_default = 10;
//     let page;
//     let size;
//     let sortQuery = "";
//     let searchQuery;
//     let populate;
//     let selectQuery;

//     // let page =  assignPage(req.query.page);
//     if (req.query.page && !isNaN(req.query.page) && req.query.page != 0) {
//       page = Math.abs(req.query.page);
//     } else {
//       page = 1;
//     }

//     // let size = assignSize(req.query.size);
//     if (req.query.size && !isNaN(req.query.size) && req.query.size != 0) {
//       size = Math.abs(req.query.size);
//     } else {
//       size = size_default;
//     }

//     //     let sortQuery = assignQuerySort(req.query.sort);
//     if (req.query.sort) {
//       let sortfield = req.query.sort.slice(1);
//       let sortby = req.query.sort.charAt(0);
//       if (sortby == 1 && !isNaN(sortby) && sortfield) {
//         //one is ascending
//         sortQuery = sortfield;
//       } else if (sortby == 0 && !isNaN(sortby) && sortfield) {
//         //zero is descending
//         sortQuery = "-" + sortfield;
//       } else {
//         sortQuery = "";
//       }
//     }
//     populate = [
//       { path: "updated_by", select: { name: 1, _id: 1 } },
//       { path: "added_by", select: { name: 1, _id: 1 } }
//     ];
//     selectQuery = "";
//     searchQuery = {
//       is_deleted: false,
//       is_active: true,
//       added_by:req.user.id
//     };
//     if (req.query.find_forum) {
//       searchQuery = {
//         title: {
//           $regex: req.query.find_forum,
//           $options: "i"
//         },
//         ...searchQuery
//       };
//     }
//     if (req.query.find_added_at) {
//       searchQuery = {
//         added_at: {
//           $regex: req.query.find_added_at,
//           $options: "i"
//         },
//         ...searchQuery
//       };
//     }
//     let forums = await otherHelper.getquerySendResponse(
//       forumsPost,
//       page,
//       size,
//       sortQuery,
//       searchQuery,
//       selectQuery,
//       next,
//       populate
//     );

//     return otherHelper.paginationSendResponse(
//       res,
//       httpStatus.OK,
//       true,
//       forums.data,
//       forumsConfig.get,
//       page,
//       size,
//       forums.totaldata
//     );
//   } catch (err) {
//     next(err);
//   }
// };
let callGetForumsId = async (req, res, next, searchQuery, populate, selectQuery) => {
  try {
    let forums = await forumSch.findOne(searchQuery).select(selectQuery).populate(populate).sort({ _id: -1 });
    if (forums) {
      return otherHelper.sendResponse(res, httpStatus.OK, true, forums, null, forumsConfig.get, null);
    } else {
      return otherHelper.sendResponse(res, httpStatus.NOT_FOUND, false, null, null, 'Data Not Found', null);
    }
  } catch (err) {
    next(err);
  }
};
//
forumsController.getForumsIdByUser = async (req, res, next) => {
  try {
    let selectQuery = 'title description status added_at  ';
    let searchQuery = {
      added_by: req.user.id,
      is_deleted: false,
      _id: req.params.id,
    };
    let populate = [
      { path: 'history.action_by', select: { name: 1 } },
      { path: 'updated_by', select: { name: 1, _id: 1 } },
      { path: 'added_by', select: { name: 1, _id: 1 } },
    ];
    let forumsResult = await callGetForumsId(req, res, next, searchQuery, populate, selectQuery);
    return forumsResult;
  } catch (err) {
    next(err);
  }
};
forumsController.getForumsIdByAdmin = async (req, res, next) => {
  try {
    let selectQuery = 'title description is_active  status added_at  ';
    let searchQuery = {
      is_deleted: false,
      _id: req.params.id,
    };
    let populate = [
      { path: 'history.action_by', select: { name: 1 } },
      { path: 'updated_by', select: { name: 1, _id: 1 } },
      { path: 'added_by', select: { name: 1, _id: 1 } },
    ];
    let forumsResult = await callGetForumsId(req, res, next, searchQuery, populate, selectQuery);
    return forumsResult;
  } catch (err) {
    next(err);
  }
};

forumsController.getForumsIdPublicy = async (req, res, next) => {
  try {
    let selectQuery = 'title description status added_at updated_at ';
    let searchQuery = {
      // status: 'approved',
      is_deleted: false,
      _id: req.params.id,
    };
    let populate = [
      { path: 'updated_by', select: { name: 1, _id: 1 } },
      { path: 'added_by', select: { name: 1, _id: 1 } },
    ];
    let forumsResult = await callGetForumsId(req, res, next, searchQuery, populate, selectQuery);
    return forumsResult;
  } catch (err) {
    next(err);
  }
};

forumsController.Approveforums = async (req, res, next) => {
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

    //
    // if (details.status=="approved") {
    //   details.approved_by = req.user.id;
    //   details.approved_at = Date.now();
    // } else if(details.status=="disapproved"){
    //   details.disapproved_by = req.user.id;
    //   details.disapproved_at = Date.now();
    //  }else{
    //   details.status="onhold"
    // }

    const history = {
      action_by: req.user.id,
      action_at: Date.now(),
      change: details.status,
    };
    details.updated_at = new Date();
    details.updated_by = req.user.id;
    details.history && delete details.history;
    const forums = await forumSch.findOneAndUpdate(
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
forumsController.postForum = async (req, res, next) => {
  try {
    let details = req.body;
    if (details._id) {
      let searchQuery = {
        _id: details._id,
        is_deleted: false,
        is_active: true,
        added_by: req.user.id,
        status: 'posted',
      };
      details.updated_at = new Date();
      let updateDoc = await forumSch.findOneAndUpdate(
        searchQuery,
        {
          $set: details,
          updated_by: req.user.id,
        },
        { new: true },
      );
      if (updateDoc) {
        return otherHelper.sendResponse(res, httpStatus.OK, true, updateDoc, null, forumsConfig.update, null);
      } else {
        return otherHelper.sendResponse(res, httpStatus.NOT_FOUND, false, null, null, 'update unsuccess', null);
      }
    } else {
      details.added_by = req.user.id;
      const newforums = new forumSch(details);
      const detailsSave = await newforums.save();
      return otherHelper.sendResponse(res, httpStatus.OK, true, detailsSave, null, forumsConfig.posted, null);
    }
  } catch (err) {
    next(err);
  }
};
forumsController.DeleteForum = async (req, res, next) => {
  try {
    const deleteForum = await forumSch.findOneAndUpdate({ _id: req.params.id, added_by: req.user.id }, { $set: { is_deleted: true, deleted_at: new Date(), deleted_by: req.user.id } });
    if (deleteForum) {
      return otherHelper.sendResponse(res, httpStatus.OK, true, deleteForum, null, forumsConfig.deleteForum, null);
    }
    return otherHelper.sendResponse(res, httpStatus.NOT_FOUND, true, null, null, forumsConfig.deleteForumError, null);
  } catch (err) {
    next(err);
  }
};
module.exports = forumsController;
