const validator = require('validator');
const httpStatus = require('http-status');
const isEmpty = require('../../validation/isEmpty');
const Config = require('./feedbackConfig');
const otherHelper = require('../../helper/others.helper');
const validation = {};

validation.validate = (req, res, next) => {
  const data = req.body;
  const validateArray = [
    {
      field: 'property_id',
      validate: [
        {
          condition: 'IsEmpty',
          msg: Config.validate.empty,
        },
      ],
    },
    {
        field: 'is_listing_correct',
        validate: [
          {
            condition: 'IsEmpty',
            msg: Config.validate.empty,
          },
        ],
      },
      // {
      //   field: 'reason',
      //   validate: [
      //     {
      //       condition: 'IsEmpty',
      //       msg: Config.validate.empty,
      //     },
      //   ],
      // },
      {
        field: 'description',
        validate: [
          {
            condition: 'IsEmpty',
            msg: Config.validate.empty,
          },
        ],
      },
      {
        field: 'mobile_no',
        validate: [
          {
            condition: 'IsEmpty',
            msg: Config.validate.empty,
          },
        ],
      },
      {
        field: 'email',
        validate: [
          {
            condition: 'IsEmpty',
            msg: Config.validate.empty,
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
