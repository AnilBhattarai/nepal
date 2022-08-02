const httpStatus = require('http-status');
const otherHelper = require('../../helper/others.helper');
const config = require('./contactagentConfig');
const isEmpty = require('../../validation/isEmpty');
const validateInput = {};

validateInput.sanitize = (req, res, next) => {
  const sanitizeArray = [
    {
      field: 'first_name',
      sanitize: {
        trim: true,
      },
    },
    {
      field: 'last_name',
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
      field: 'message',
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
  ];
  otherHelper.sanitize(req, sanitizeArray);
  next();
};
validateInput.validate = async (req, res, next) => {
  const data = req.body;
  const validateArray = [
    {
      field: 'first_name',
      validate: [
        {
          condition: 'IsEmpty',
          msg: config.validate.nameEmp,
        },
      ],
    },
    {
      field: 'last_name',
      validate: [
        {
          condition: 'IsEmpty',
          msg: config.validate.nameEmp,
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
      field: 'message',
      validate: [
        {
          condition: 'IsEmpty',
          msg: config.validate.msgEmp,
        },
      ],
    },
    {
      field: 'phone',
      validate: [
        {
          condition: 'IsEmpty',
          msg: config.validate.msgEmp,
        },
      ],
    },
    {
      field: 'contact_purpose',
      validate: [
        {
          condition: 'IsEmpty',
          msg: config.validate.msgEmp,
        },
        {
          condition: 'IsIn',
          option: ['Selling_my_property', 'Buying_new_property', 'Looking_to_rent_a_property'],
          msg: config.validate.enumTypes,
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
