const httpStatus = require('http-status');
const otherHelper = require('../../helper/others.helper');
const config = require('./myRequestConfig');
// const apiCallHelper = require('../../helper/apicall.helper');
// const {
//   recaptcha: { secretKey, siteKey },
// } = require('../../config/keys');
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
      field: 'message',
      sanitize: {
        trim: true,
      },
    },
    {
      field: 'mobile_no',
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
      field: 'price',
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
  //let code = data.reCaptcha;
  //const verifyUrl = `https://google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${code}&remoteip=${req.connection.remoteAddress}`;
  //let verified = await apiCallHelper.requestThirdPartyApi(req, verifyUrl, null, next, 'POST');
  // if (!(verified && verified.success)) {
  //   return otherHelper.sendResponse(res, httpStatus.NOT_ACCEPTABLE, false, null, config.verifyError, null, null);
  // }
  const validateArray = [
    {
      field: 'name',
      validate: [
        {
          condition: 'IsEmpty',
          msg: config.validate.emp,
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
          msg: config.validate.emp,
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
          msg: config.validate.emp,
        },
        {
          condition: 'IsLength',
          msg: config.validate.msgLen,
          options: { min: 5, max: 300 },
        },
      ],
    },
    {
      field: 'purpose',
      validate: [
        {
          condition: 'IsEmpty',
          msg: config.validate.emp,
        },

      ],
    }
  ];
  const errors = otherHelper.validation(data, validateArray);
  if (!isEmpty(errors)) {
    return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, errors, config.valErr, null);
  } else {
    next();
  }
};
module.exports = validateInput;
