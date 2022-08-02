const httpStatus = require('http-status');
const isEmpty = require('../../validation/isEmpty');
const companyConfig = require('./companyConfig');
const otherHelper = require('../../helper/others.helper');
const validation = {};

validation.sanitize = (req, res, next) => {
  const sanitizeArray = [
    {
      field: 'name',
      sanitize: {
        trim: true,
      },
    },
    {
      field: 'email',
      sanitize: {
        trim: true,
      },
    },
    {
        field: 'address',
        sanitize: {
          trim: true,
        },
    },
    {
        field: 'phone_no',
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
      field: 'name',
      validate: [
        {
          condition: 'IsEmpty',
          msg: companyConfig.validate.empty,
        },
        
      ],
    },
    {
      field: 'address',
      validate: [
        {
          condition: 'IsEmpty',
          msg: companyConfig.validate.empty,
        },
      ],
    },
    {
      field: 'email',
      validate: [
        {
          condition: 'IsEmpty',
          msg: companyConfig.validate.empty,
        },
        {
            condition: 'IsEmail',
            msg: companyConfig.validate.email,
        }
      ],
    },
    {
        field: 'phone_no',
        validate: [
          {
            condition: 'IsEmpty',
            msg: companyConfig.validate.empty,
          },
          {
            condition: 'IsPhone',
            msg: companyConfig.validate.phone,
          }
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
