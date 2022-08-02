const httpStatus = require('http-status');
const isEmpty = require('../../validation/isEmpty');
const resourceConfig = require('./resourceConfig');
const otherHelper = require('../../helper/others.helper');
const validations = {};

validations.sanitize = (req, res, next) => {
  const sanitizeArray = [
    {
      field: 'name',
      sanitize: {
        trim: true,
      },
    },
    {
      field: 'key',
      sanitize: {
        trim: true,
      },
    },
    {
      field: 'file_id',
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
      field: 'name',
      validate: [
        {
          condition: 'IsEmpty',
          msg: resourceConfig.validation.empty,
        },
        {
          condition: 'IsLength',
          msg: resourceConfig.validation.nameLength,
        },
      ],
    },
    {
      field: 'key',
      validate: [
        {
          condition: 'IsEmpty',
          msg: resourceConfig.validation.empty,
        },
        {
          condition: 'IsLength',
          msg: resourceConfig.validation.keyLength,
        },
      ],
    },
    {
      field: 'resource_for',
      validate: [
        {
          condition: 'IsEmpty',
          msg: resourceConfig.validation.empty,
        },
        {
          condition: 'IsIn',
          option: ['agent', 'developer'],
          msg: resourceConfig.validation.invalid_resource_for,
        }
      ]
    },
    {
      field: 'file_id',
      validate: [
        {
          condition: 'IsEmpty',
          msg: resourceConfig.validation.empty,
        },
        {
          condition: 'IsMongoId',
          msg: resourceConfig.validation.invalid,
        },
      ],
    },
  ];
  const errors = otherHelper.validation(data, validateArray);
  if (!isEmpty(errors)) {
    return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, errors, 'input error', null);
  } else {
    next();
  }
};

module.exports = validations;
