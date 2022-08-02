const httpStatus = require('http-status');
const isEmpty = require('../../validation/isEmpty');
const careersConfig = require('./careersConfig');
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
   
  ];
  otherHelper.sanitize(req, sanitizeArray);
  next();
};





validations.publisherSanitize = (req, res, next) => {
  const sanitizeArray = [
    
    {
      field: 'job_title',
      sanitize: {
        trim: true,
      },
    },
    {
      field: 'job_discriptions',
      sanitize: {
        trim: true,
      },
    },
    {
      field: 'skill_requirements',
      sanitize: {
        trim: true,
      },
    },
  ];
  otherHelper.sanitize(req, sanitizeArray);
  next();
};



validations.careersPublisherValidation = (req, res, next) => {
  let data = req.body;
  let  validateArray = [
    {
      field: 'job_title',
      validate: [
        {
          condition: 'IsEmpty',
          msg: careersConfig.validate.empty,
        },
        {
          condition: 'IsLength',
          msg: careersConfig.validate.nameLength,
        },
      ],
    },
    {
      field: 'job_descriptions',
      validate: [
        {
          condition: 'IsEmpty',
          msg: careersConfig.validate.empty,
        },
        
      ],
    },
    {
        field: 'skill_requirements',
        validate: [
          {
            condition: 'IsEmpty',
            msg: careersConfig.validate.empty,
          },
       
        
        ],
      },
      
    {
      field: 'deadline_at',
      validate: [
        {
          condition: 'IsDate',
          msg: careersConfig.validate.isDate,
        },
      ],
    },
    
    // {
    //   field: 'slug_url',
    //   validate: [
    //     {
    //       condition: 'IsUnique',
    //       msg: careersConfig.validate.isunique,
    //     },
        
    //   ],
    // }
  ];
  const errors = otherHelper.validation(data, validateArray);
  if (!isEmpty(errors)) {
    return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, errors, 'input error', null);
  } else {
    next();
  }
};

validations.careersSeekerValidation = (req, res, next) => {
  const data = req.body;
   data.cvFile = req.file;
  let  validateArray = [
    {
      field: 'name',
      validate: [
        {
          condition: 'IsEmpty',
          msg: careersConfig.validate.empty,
        },
        {
          condition: 'IsLength',
          msg: careersConfig.validate.nameLength,
        },
      ],
    },
    {
      field: 'email',
      validate: [
        {
          condition: 'IsEmpty',
          msg: careersConfig.validate.empty,
        },
        {
          condition: 'IsEmail',
          msg: careersConfig.validate.isEmail,
        },
      ],
    },
    // {
    //     field: 'phone',
    //     validate: [
    //       {
    //         condition: 'IsEmpty',
    //         msg: careersConfig.validate.empty,
    //       },
    //       // {
    //       //   condition: 'IsPhone',
    //       //   msg: careersConfig.validate.isPhone,
    //       // },
        
    //     ],
    //   },
      {
        field: 'cvFile',
        validate: [
          {
            condition: 'IsEmpty',
            msg: careersConfig.validate.empty,
          },
         
        ],
      },
      { 
        field: 'cover_letter', 
        validate: [ 
          { 
            condition: 'IsEmpty',  
            msg: careersConfig.validate.empty, 
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
