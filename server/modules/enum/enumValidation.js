const httpStatus = require('http-status');
const isEmpty = require('../../validation/isEmpty');
const contentConfig = require('./enumConfig');
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
      field: 'order',
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
  const data = req.body;
  const validateArray = [
    {
      field: 'title',
      validate: [
        {
          condition: 'IsEmpty',
          msg: contentConfig.validation.empty,
        },
        {
          condition: 'IsLength',
          msg: contentConfig.validation.nameLength,
        },
      ],
    },
    {
      field: 'description',
      validate: [
        {
          condition: 'IsEmpty',
          msg: contentConfig.validation.empty,
        },
        {
          condition: 'IsLength',
          msg: contentConfig.validation.descriptionLength,
        },
      ],
    },
    // {
    //   field: 'publish_from',
    //   validate: [
    //     {
    //       condition: 'IsDate',
    //       msg: contentConfig.validation.isDate,
    //     },
    //   ],
    // },
    // {
    //   field: 'publish_to',
    //   validate: [
    //     {
    //       condition: 'IsDate',
    //       msg: contentConfig.validation.isDate,
    //     },
    //   ],
    // },
  ];
  const errors = otherHelper.validation(data, validateArray);
  if (!isEmpty(errors)) {
    return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, errors, 'input error', null);
  } else {
    next();
  }
};
module.exports = validations;
