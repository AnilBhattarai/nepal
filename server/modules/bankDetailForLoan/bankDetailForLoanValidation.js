const httpStatus = require('http-status');
const isEmpty = require('../../validation/isEmpty');
const bankDetailForLoanConfig = require('./bankDetailForLoanConfig');
const otherHelper = require('../../helper/others.helper');
const validation = {};

validation.sanitize = (req, res, next) => {
  const sanitizeArray = [
    {
      field: 'Bank_Name',
      sanitize: {
        trim: true,
      },
    },
    {
      field: 'Rate_Of_interest',
      sanitize: {
        trim: true,
      },
    },
    {
        field: 'Processing_Fees',
        sanitize: {
          trim: true,
        },
    },
    {
        field: 'Max_Tenure',
        sanitize: {
          trim: true,
        },
    },
    {
        field: 'Min_Tenure',
        sanitize: {
          trim: true,
        },
    }  
  ];
  otherHelper.sanitize(req, sanitizeArray);
  next();
};

// validation.validate = (req, res, next) => {
//   const data = req.body;
//   const validateArray = [
//     {
//       field: 'Bank_Name',
//       validate: [
//         {
//           condition: 'IsEmpty',
//           msg: bankDetailForLoanConfig.validate.empty,
//         },
        
//       ],
//     },
//     {
//       field: 'Rate_Of_interest',
//       validate: [
//         {
//           condition: 'IsEmpty',
//           msg: bankDetailForLoanConfig.validate.empty,
//         },
//       ],
//     },
//     {
//       field: 'Processing_Fees',
//       validate: [
//         {
//           condition: 'IsEmpty',
//           msg: bankDetailForLoanConfig.validate.empty,
//         },
//       ],
//     },
//     {
//         field: 'IS_Include_VAT',
//         validate: [
//           {
//             condition: 'IsBoolean',
//             msg: bankDetailForLoanConfig.validate.Boolean,
//           },
//         ],
//       },
//       {
//         field: 'Max_Tenure',
//         validate: [
//           {
//             condition: 'IsEmpty',
//             msg: bankDetailForLoanConfig.validate.empty,
//           },
//         ],
//       },
//       {
//         field: 'Min_Tenure',
//         validate: [
//           {
//             condition: 'IsEmpty',
//             msg: bankDetailForLoanConfig.validate.empty,
//           },
//         ],
//       },
//   ];
//   const errors = otherHelper.validation(data, validateArray);
//   if (!isEmpty(errors)) {
//     return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, errors, 'input errors', null);
//   } else {
//     next();
//   }
// };

module.exports = validation;
