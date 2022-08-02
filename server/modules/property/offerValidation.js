const httpStatus = require('http-status');
const isEmpty = require('../../validation/isEmpty');
const contentConfig = require('./propertyConfig');
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
      field: 'email',
      sanitize: {
        trim: true,
      },
    },
    {
      field: 'phone',
      sanitize: {
        trim: true,
      },
    },
    {
      field: 'message',
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
  data.propertyId = req.params.propId;
  let validateArray = [
    {
      field: 'name',
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
      field: 'email',
      validate: [
        {
          condition: 'IsEmpty',
          msg: contentConfig.validation.empty,
        },
        {
          condition: 'IsEmail',
          msg: contentConfig.validation.isEmail,
        },
      ],
    },
    {
      field: 'phone',
      validate: [
        // {
        //   condition: 'IsEmpty',
        //   msg: contentConfig.validation.empty,
        // },
        // {
        //   condition: 'IsPhone',
        //   msg: contentConfig.validation.isPhone,
        // },
      ],
    },

    {
      field: 'message',
      validate: [
        {
          condition: 'IsEmpty',
          msg: contentConfig.validation.empty,
        },
      ],
    },
    {
      field: 'propertyId',
      validate: [
        {
          condition: 'IsMongoId',
          msg: contentConfig.validation.mongoIderr,
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
