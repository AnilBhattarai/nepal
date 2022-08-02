const httpStatus = require('http-status');
const isEmpty = require('../../validation/isEmpty');
const forumsConfig = require('./forumsConfig');
const otherHelper = require('../../helper/others.helper');
const validations = {};

validations.sanitize = (req, res, next) => {
  const sanitizeArray = [
    {
      field: 'title',
      sanitize: {
        trim: true,
      },
    },
    {
      field: 'description',
      sanitize: {
        trim: true,
      },
    },
   
   
  ];
  otherHelper.sanitize(req, sanitizeArray);
  next();
};








validations.validation = (req, res, next) => {
  let data = req.body;
 data.status!==''?data.status: data.status='posted'
  let  validateArray = [
    {
      field: 'title',
      validate: [
        {
          condition: 'IsEmpty',
          msg: forumsConfig.validate.empty,
        },
      ],
    },
    {
      field: 'description',
      validate: [
        {
          condition: 'IsEmpty',
          msg: forumsConfig.validate.empty,
        },
      ],
    },

  ];
  const errors = otherHelper.validation(data, validateArray);
  if (!isEmpty(errors)) {
    return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, errors, 'invalid input', null);
  } else {
    next();
  }
};


module.exports = validations;
