const httpStatus = require('http-status');
const isEmpty = require('../../validation/isEmpty');
const staticConfig = require('./staticConfig');
const otherHelper = require('../../helper/others.helper');
const { state, disctrict, vdcMunicipality, area } = require('./staticShema');
const validations = {};
validations.sanitizeName = (req, res, next) => {
  const sanitizeArray = [
    {
      field: 'name',
      sanitize: {
        trim: true,
      },
    },
  ];
  otherHelper.sanitize(req, sanitizeArray);
  next();
};
validations.sanitizeState = (req, res, next) => {
  const sanitizeArray = [
    {
      field: 'stateID',
      sanitize: {
        trim: true,
      },
    },
    {
      field: 'state_name',
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
      field: 'is_active',
      sanitize: {
        toBoolean: true,
      },
    },
  ];
  otherHelper.sanitize(req, sanitizeArray);
  next();
};

validations.sanitizeDistrict = (req, res, next) => {
  const sanitizeArray = [
    {
      field: 'stateID',
      sanitize: {
        trim: true,
      },
    },
    {
      field: 'is_active',
      sanitize: {
        toBoolean: true,
      },
    },
    {
      field: 'districtID',
      sanitize: {
        trim: true,
      },
    },
    {
      field: 'district_name',
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
validations.sanitizeMunicipality = (req, res, next) => {
  const sanitizeArray = [
    {
      field: 'municipalityID',
      sanitize: {
        trim: true,
      },
    },
    {
      field: 'is_active',
      sanitize: {
        toBoolean: true,
      },
    },
    {
      field: 'districtID',
      sanitize: {
        trim: true,
      },
    },
    {
      field: 'municipality_name',
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
validations.sanitizeArea = (req, res, next) => {
  const sanitizeArray = [
    {
      field: 'municipalityID',
      sanitize: {
        trim: true,
      },
    },
    {
      field: 'is_active',
      sanitize: {
        toBoolean: true,
      },
    },
    {
      field: 'areaID',
      sanitize: {
        trim: true,
      },
    },
    {
      field: 'area_name',
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

validations.validateState = (req, res, next) => {
  const data = req.body;
  const validationArray = [
    {
      field: 'stateID',
      validate: [
        {
          condition: 'IsEmpty',
          msg: staticConfig.validation.empty,
        },
        {
          condition: 'IsInt',
          msg: staticConfig.validation.valueNumeric,
          option: { min: 1 },
        },
      ],
    },
    {
      field: 'is_active',
      validate: [
        {
          condition: 'IsEmpty',
          msg: staticConfig.validation.empty,
        },
      ],
    },
    {
      field: 'state_name',
      validate: [
        {
          condition: 'IsEmpty',
          msg: staticConfig.validation.empty,
        },
      ],
    },
  ];

  const errors = otherHelper.validation(data, validationArray);
  if (!isEmpty(errors)) {
    return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, errors, 'Invalid Input', null);
  } else {
    next();
  }
};

validations.validateDistrict = (req, res, next) => {
  const data = req.body;
  const validationArray = [
    {
      field: 'stateID',
      validate: [
        {
          condition: 'IsEmpty',
          msg: staticConfig.validation.empty,
        },
        {
          condition: 'IsInt',
          msg: staticConfig.validation.valueNumeric,
          option: { min: 1 },
        },
      ],
    },
    {
      field: 'is_active',
      validate: [
        {
          condition: 'IsEmpty',
          msg: staticConfig.validation.empty,
        },
      ],
    },
    {
      field: 'district_name',
      validate: [
        {
          condition: 'IsEmpty',
          msg: staticConfig.validation.empty,
        },
      ],
    },
    {
      field: 'districtID',
      validate: [
        {
          condition: 'IsEmpty',
          msg: staticConfig.validation.empty,
        },
        {
          condition: 'IsInt',
          msg: staticConfig.validation.valueNumeric,
          option: { min: 1 },
        },
      ],
    },
  ];

  const errors = otherHelper.validation(data, validationArray);
  if (!isEmpty(errors)) {
    return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, errors, 'Invalid Input', null);
  } else {
    next();
  }
};
validations.validateMunicipality = (req, res, next) => {
  const data = req.body;
  const validationArray = [
    {
      field: 'municipalityID',
      validate: [
        {
          condition: 'IsEmpty',
          msg: staticConfig.validation.empty,
        },
        {
          condition: 'IsInt',
          msg: staticConfig.validation.valueNumeric,
          option: { min: 1 },
        },
      ],
    },
    {
      field: 'is_active',
      validate: [
        {
          condition: 'IsEmpty',
          msg: staticConfig.validation.empty,
        },
      ],
    },
    {
      field: 'municipality_name',
      validate: [
        {
          condition: 'IsEmpty',
          msg: staticConfig.validation.empty,
        },
      ],
    },
    {
      field: 'districtID',
      validate: [
        {
          condition: 'IsEmpty',
          msg: staticConfig.validation.empty,
        },
        {
          condition: 'IsInt',
          msg: staticConfig.validation.valueNumeric,
          option: { min: 1 },
        },
      ],
    },
  ];

  const errors = otherHelper.validation(data, validationArray);
  if (!isEmpty(errors)) {
    return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, errors, 'Invalid Input', null);
  } else {
    next();
  }
};
validations.validateArea = (req, res, next) => {
  const data = req.body;
  const validationArray = [
    {
      field: 'areaID',
      validate: [
        {
          condition: 'IsEmpty',
          msg: staticConfig.validation.empty,
        },
        {
          condition: 'IsInt',
          msg: staticConfig.validation.valueNumeric,
          option: { min: 1 },
        },
      ],
    },
    {
      field: 'is_active',
      validate: [
        {
          condition: 'IsEmpty',
          msg: staticConfig.validation.empty,
        },
      ],
    },
    {
      field: 'area_name',
      validate: [
        {
          condition: 'IsEmpty',
          msg: staticConfig.validation.empty,
        },
      ],
    },
    {
      field: 'municipalityID',
      validate: [
        {
          condition: 'IsEmpty',
          msg: staticConfig.validation.empty,
        },
        {
          condition: 'IsInt',
          msg: staticConfig.validation.valueNumeric,
          option: { min: 1 },
        },
      ],
    },
  ];

  const errors = otherHelper.validation(data, validationArray);
  if (!isEmpty(errors)) {
    return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, errors, 'Invalid Input', null);
  } else {
    next();
  }
};

validations.checkDuplicateState = async (req, res, next) => {
  let { stateID, state_name } = req.body;
  let filter = { $or: [{ stateID }, { state_name }], is_deleted: false };
  if (req.body._id) {
    filter._id = { $ne: req.body._id };
  }
  try {
    let duplicate = await state.findOne(filter);
    if (isEmpty(duplicate)) {
      next();
    } else {
      return otherHelper.sendResponse(res, httpStatus.CONFLICT, false, null, null, 'StateID or StateName already exists!', null);
    }
  } catch (err) {
    next(err);
  }
};

validations.checkDuplicateArea = async (req, res, next) => {
  let { areaID, area_name, municipalityID } = req.body;
  let filter = {
    $or: [
      { areaID, municipalityID },
      { area_name, municipalityID },
    ],
    is_deleted: false,
  };
  if (req.body._id) {
    filter._id = { $ne: req.body._id };
  }
  try {
    let duplicate = await area.findOne(filter);
    if (isEmpty(duplicate)) {
      next();
    } else {
      return otherHelper.sendResponse(res, httpStatus.CONFLICT, false, null, null, 'AreaID or AreaName already exists in same municipality!', null);
    }
  } catch (err) {
    next(err);
  }
};
validations.checkDuplicateMunicipality = async (req, res, next) => {
  let { municipalityID, municipality_name } = req.body;
  let filter = { $or: [{ municipalityID }, { municipality_name }], is_deleted: false };
  if (req.body._id) {
    filter._id = { $ne: req.body._id };
  }
  try {
    let duplicate = await vdcMunicipality.findOne(filter);
    if (isEmpty(duplicate)) {
      next();
    } else {
      return otherHelper.sendResponse(res, httpStatus.CONFLICT, false, null, null, 'MunicipalityID or MunicipalityName already exists!', null);
    }
  } catch (err) {
    next(err);
  }
};
validations.checkDuplicateDistrict = async (req, res, next) => {
  let { districtID, district_name } = req.body;
  let filter = { $or: [{ districtID }, { district_name }], is_deleted: false };
  if (req.body._id) {
    filter._id = { $ne: req.body._id };
  }
  try {
    let duplicate = await disctrict.findOne(filter);
    if (isEmpty(duplicate)) {
      next();
    } else {
      return otherHelper.sendResponse(res, httpStatus.CONFLICT, false, null, null, 'DistrictID or DistrictName already exists!', null);
    }
  } catch (err) {
    next(err);
  }
};
module.exports = validations;
