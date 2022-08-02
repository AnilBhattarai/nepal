const careersSeeker = require('./careersSeekerSchema');
const careersPublisher = require('./careersPublisherSchema');
const careersConfig = require('./careersConfig');
const otherHelper = require('../../helper/others.helper');
const httpStatus = require('http-status');
const { assignPage, assignSize, assignQuerySort } = require('../../helper/module.helper');

const careersController = {};
careersController.getCareers = async (req, res, next) => {
  try {
    const size_default = 10;
    let page;
    let size;
    let sortQuery = '';
    let searchQuery;
    let populate;
    let selectQuery;

    // let page =  assignPage(req.query.page);
    if (req.query.page && !isNaN(req.query.page) && req.query.page != 0) {
      page = Math.abs(req.query.page);
    } else {
      page = 1;
    }

    // let size = assignSize(req.query.size);
    if (req.query.size && !isNaN(req.query.size) && req.query.size != 0) {
      size = Math.abs(req.query.size);
    } else {
      size = size_default;
    }

    //     let sortQuery = assignQuerySort(req.query.sort);
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
    populate = [];

    selectQuery = 'job_title slug_url deadline_at no_of_vacancy';
    searchQuery = {
      is_deleted: false,
      is_active: true,
    };
    if (req.query.find_job_title) {
      searchQuery = {
        title: {
          $regex: req.query.find_job_title,
          $options: 'i',
        },
        ...searchQuery,
      };
    }
    if (req.query.find_published_on) {
      searchQuery = {
        published_on: {
          $regex: req.query.find_published_on,
          $options: 'i',
        },
        ...searchQuery,
      };
    }
    let careers = await otherHelper.getquerySendResponse(careersPublisher, page, size, sortQuery, searchQuery, selectQuery, next, populate);

    return otherHelper.paginationSendResponse(res, httpStatus.OK, true, careers.data, careersConfig.get, page, size, careers.totaldata);
  } catch (err) {
    next(err);
  }
};
careersController.getPostedCareersById = async (req, res, next) => {
  try {
    let selectQuery = 'job_title job_descriptions skill_requirements slug_url no_of_vacancy is_deleted is_active published_on deadline_at';
    searchQuery = {
      _id: req.params.id,
      is_active: true,
      is_deleted: false,
    };

    let careers = await careersPublisher.findOne(searchQuery).select(selectQuery);
    return otherHelper.sendResponse(res, httpStatus.OK, true, careers, null, careersConfig.get, null);
    // let careers = await otherHelper.getquerySendResponse(careersPublisher, page, size, sortQuery, searchQuery, selectQuery, next, populate);
    // return otherHelper.paginationSendResponse(res, httpStatus.OK, true, ...careers.data,careersConfig.get, page, size,careers.totaldata);
  } catch (err) {
    next(err);
  }
};

careersController.getCareersBySlug = async (req, res, next) => {
  try {
    let selectQuery = 'job_title job_descriptions skill_requirements no_of_vacancy published_on deadline_at';
    searchQuery = {
      is_deleted: false,
      slug_url: req.params.slug_url,
    };

    let careers = await careersPublisher.findOne(searchQuery).select(selectQuery);
    return otherHelper.sendResponse(res, httpStatus.OK, true, careers, null, careersConfig.get, null);

    //let careers = await otherHelper.getquerySendResponse(careersPublisher, page, size, sortQuery, searchQuery, selectQuery, next, populate);

    //return otherHelper.paginationSendResponse(res, httpStatus.OK, true, ...careers.data,careersConfig.get, page, size,careers.totaldata);
  } catch (err) {
    next(err);
  }
};

careersController.getAppliedUsers = async (req, res, next) => {
  try {
    const size_default = 10;
    let page;
    let size;
    let sortQuery = '';
    let searchQuery;
    let populate;
    let selectQuery;
    // let page =  assignPage(req.query.page);
    if (req.query.page && !isNaN(req.query.page) && req.query.page != 0) {
      page = Math.abs(req.query.page);
    } else {
      page = 1;
    }
    //let size = 5;

    // let size = assignSize(req.query.size);
    if (req.query.size && !isNaN(req.query.size) && req.query.size != 0) {
      size = Math.abs(req.query.size);
    } else {
      size = size_default;
    }

    // let sortQuery = assignQuerySort(req.query.sort);
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
    populate = [];

    selectQuery = 'name email';
    searchQuery = {};

    if (req.query.name) {
      searchQuery = {
        title: {
          $regex: req.query.name,
          $options: 'i',
        },
        ...searchQuery,
      };
    }
    let apppliedUser = await otherHelper.getquerySendResponse(careersSeeker, page, size, sortQuery, searchQuery, selectQuery, next, populate);
    return otherHelper.paginationSendResponse(res, httpStatus.OK, true, apppliedUser.data, careersConfig.get, page, size, apppliedUser.totaldata);
  } catch (err) {
    next(err);
  }
};

careersController.getAppliedUserById = async (req, res, next) => {
  try {
    let selectQuery = 'name email phone cvFile cover_letter';
    let searchQuery = {
      is_deleted: false,
      _id: req.params.id,
    };

    let careers = await careersSeeker.findOne(searchQuery).select(selectQuery);
    return otherHelper.sendResponse(res, httpStatus.OK, true, careers, null, careersConfig.get, null);
    // let apppliedUser = await otherHelper.getquerySendResponse(careersSeeker, page, size, sortQuery, searchQuery, selectQuery, next, populate);
    // return otherHelper.paginationSendResponse(res, httpStatus.OK, true, ...apppliedUser.data,careersConfig.get, page, size,apppliedUser.totaldata);
  } catch (err) {
    next(err);
  }
};

careersController.getPostedCareers = async (req, res, next) => {
  try {
    const size_default = 10;
    let page;
    let size;
    let sortQuery;
    let searchQuery;
    let populate;
    let selectQuery;

    // // let page =  assignPage(req.query.page);
    if (req.query.page && !isNaN(req.query.page) && req.query.page != 0) {
      page = Math.abs(req.query.page);
    } else {
      page = 1;
    }

    // let size = assignSize(req.query.size);
    if (req.query.size && !isNaN(req.query.size) && req.query.size != 0) {
      size = Math.abs(req.query.size);
    } else {
      size = size_default;
    }

    // let sortQuery = assignQuerySort(req.query.sort);
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
    populate = [];

    selectQuery = 'job_title  slug_url no_of_vacancy is_active deadline_at';
    searchQuery = {
      is_deleted: false,
    };
    if (req.query.find_job_title) {
      searchQuery = {
        title: {
          $regex: req.query.find_job_title,
          $options: 'i',
        },
        ...searchQuery,
      };
    }
    if (req.query.find_published_on) {
      searchQuery = {
        published_on: {
          $regex: req.query.find_published_on,
          $options: 'i',
        },
        ...searchQuery,
      };
    }
    let careers = await otherHelper.getquerySendResponse(careersPublisher, page, size, sortQuery, searchQuery, selectQuery, next, populate);
    return otherHelper.paginationSendResponse(res, httpStatus.OK, true, careers.data, careersConfig.get, page, size, careers.totaldata);
  } catch (err) {
    next(err);
  }
};
careersController.postAdminCareers = async (req, res, next) => {
  try {
    let careersDetails = req.body;
    const { _id, ...restCareersDetails } = careersDetails;
    if (_id) {
      const filter = { _id };
      const update = {
        // job_title:careersDetails.job_title,
        // is_active:careersDetails.is_active,
        // job_descriptions:careersDetails.job_descriptions,
        // slug_url:careersDetails.slug_url,
        // deadline_at:careersDetails.deadline_at,

        ...restCareersDetails,
      };
      let updateDoc = await careersPublisher.findOneAndUpdate(filter, update, { new: true });

      return otherHelper.sendResponse(res, httpStatus.OK, true, updateDoc, null, 'updated sucessfully', null);
    } else {
      const newCareersDetails = new careersPublisher(careersDetails);
      const careersdetailsave = await newCareersDetails.save();
      return otherHelper.sendResponse(res, httpStatus.OK, true, careersdetailsave, null, 'Applied success', null);
    }
  } catch (err) {
    next(err);
  }
};

careersController.PostDetails = async (req, res, next) => {
  try {
    let details = req.body;
    if (req.file) {
      req.file.destination = req.file.destination.split('\\').join('/').split('server/')[1] + '/';
      req.file.path = req.file.path.split('\\').join('/').split('server/')[1];
      details.cvFile = req.file;
      const newCareers = new careersSeeker(details);
      const detailsave = await newCareers.save();
      return otherHelper.sendResponse(res, httpStatus.OK, true, detailsave, null, 'Applied success', null);
    }
  } catch (err) {
    next(err);
  }
};
module.exports = careersController;
