const httpStatus = require('http-status');
const isEmpty = require('../../validation/isEmpty');
const agencyConfig = require('./agencyConfig');
const otherHelper = require('../../helper/others.helper');
const agencySch = require('./agencySchema');
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
      field: 'slug_url',
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
      field: 'website',
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
    {
      field: 'phone',
      sanitize: {
        trim: true,
      },
    },
    {
      field: 'mobile',
      sanitize: {
        trim: true,
      },
    },
    {
      field: 'fb_link',
      sanitize: {
        trim: true,
      },
    },
  ];
  otherHelper.sanitize(req, sanitizeArray);
  next();
};
validations.validation = async (req, res, next) => {
  const data = req.body;
  const validateArray = [
    {
      field: 'title',
      validate: [
        {
          condition: 'IsEmpty',
          msg: agencyConfig.validation.empty,
        },
        {
          condition: 'IsLength',
          msg: agencyConfig.validation.nameLength,
        },
      ],
    },
    {
      field: 'email',
      validate: [
        {
          condition: 'IsEmpty',
          msg: agencyConfig.validation.empty,
        },
        {
          condition: 'IsEmail',
          msg: agencyConfig.validation.isEmail,
        },
      ],
    },
    {
      field: 'slug_url',
      validate: [
        {
          condition: 'IsEmpty',
          msg: agencyConfig.validation.empty,
        },
      ],
    },
  ];
  const errors = otherHelper.validation(data, validateArray);
  let find = { slug_url: data.slug_url };
  if (req.body._id) {
    find = { ...find, _id: { $ne: req.body._id } };
  }
  const agency = await agencySch.find(find);
  if (!isEmpty(errors)) {
    return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, errors, 'input error', null);
  } else if (agency && agency.length > 0) {
    return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, null, 'slug must be unique', null);
  } else {
    next();
  }
};
module.exports = validations;
