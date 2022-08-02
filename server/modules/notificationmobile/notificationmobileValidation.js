const httpStatus = require('http-status');
const isEmpty = require('../../validation/isEmpty');
const notificationConfig = require('./notificationmobileConfig');
const otherHelper = require('../../helper/others.helper');
const validation = {};

validation.sanitize = (req, res, next) => {
  const sanitizeArray = [
    {
      field: 'title',
      sanitize: {
        trim: true,
      },
    },
    {
        field: 'body',
        sanitize: {
          trim: true,
        },
      },

    
  ];
  otherHelper.sanitize(req, sanitizeArray);
  next();
};

validation.validate = (req, res, next) => {
  const data = req.body;
  const validateArray = [
    {
      field: 'title',
      validate: [
        {
          condition: 'IsEmpty',
          msg: notificationConfig.validate.empty,
        },
      ],
    },
    {
        field: 'body',
        validate: [
          {
            condition: 'IsEmpty',
            msg: notificationConfig.validate.empty,
          },
        ],
      },
    {
        field: 'userid',
        validate: [
          {
            condition: 'IsEmpty',
            msg: notificationConfig.validate.empty,
          },
        ],
      },
      
  ];
  const errors = otherHelper.validation(data, validateArray);

  if (!isEmpty(errors)) {
    return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, errors, 'input errors', null);
  } else {
    next();
  }
};


module.exports = validation;
