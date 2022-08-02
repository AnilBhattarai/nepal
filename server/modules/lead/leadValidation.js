const httpStatus = require('http-status');
const otherHelper = require('../../helper/others.helper');
const config = require('./leadConfig');
const apiCallHelper = require('../../helper/apicall.helper');
const {
  recaptcha: { secretKey },
} = require('../../config/keys');
const isEmpty = require('../../validation/isEmpty');
const validateInput = {};

validateInput.sanitize = (req, res, next) => {
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
      field: 'inquiry',
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
    {
      field: 'profile_link',
      sanitize: {
        trim: true,
      },
    },
    {
      field: 'channel',
      sanitize: {
        trim: true,
      },
    },
    {
      field: 'date',
      sanitize: {
        trim: true,
      },
    },
  ];
  otherHelper.sanitize(req, sanitizeArray);
  next();
};
validateInput.validate = async (req, res, next) => {
  const data = req.body;
  let validateArray = [
    {
      field: 'name',
      validate: [
        {
          condition: 'IsEmpty',
          msg: config.validate.nameEmp,
        },
        {
          condition: 'IsLength',
          msg: config.validate.nameLen,
          options: { min: 2, max: 50 },
        },
      ],
    },
    {
      field: 'email',
      validate: [
        {
          condition: 'IsEmpty',
          msg: config.validate.emailEmp,
        },
        {
          condition: 'IsEmail',
          msg: config.validate.isEmail,
        },
      ],
    },
    {
      field: 'inquiry',
      validate: [
        {
          condition: 'IsEmpty',
          msg: config.validate.msgEmp,
        },
        {
          condition: 'IsIn',
          msg: config.validate.ValidChannel,
          options: ['Contact_Form', 'Facebook', 'Property_Inquiries', 'Via_Phone'],
        },
      ],
    },
  ];
  const errors = otherHelper.validation(data, validateArray);
  if (!isEmpty(errors)) {
    return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, errors, config.valErr, null);
  } else {
    next();
  }
};
module.exports = validateInput;
