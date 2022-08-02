const httpStatus = require('http-status');
const isEmpty = require('../../validation/isEmpty');
const contentConfig = require('./propertyConfig');
const otherHelper = require('../../helper/others.helper');
const validateHelper = require('../../helper/validate.helper');
const validations = {};
const internal = {};

validations.sanitize = (req, res, next) => {
  const sanitizeArray = [
    {
      field: 'basic.title',
      sanitize: {
        trim: true,
      },
    },
    {
      field: 'basic.description',
      sanitize: {
        trim: true,
      },
    },
    {
      field: 'address.house_no',
      sanitize: {
        trim: true,
      },
    },
    {
      field: 'location_property.total_area',
      sanitize: {
        trim: true,
      },
    },
    {
      field: 'location_property.built_area',
      sanitize: {
        trim: true,
      },
    },
    {
      field: 'location_property.road_access_value',
      sanitize: {
        trim: true,
      },
    },
    {
      field: 'building.built_year',
      sanitize: {
        trim: true,
      },
    },
    {
      field: 'building.built_month',
      sanitize: {
        trim: true,
      },
    },
    {
      field: 'building.total_floor',
      sanitize: {
        trim: true,
      },
    },
    {
      field: 'building.no_of.kitchen',
      sanitize: {
        trim: true,
      },
    },
    {
      field: 'building.no_of.dinningroom',
      sanitize: {
        trim: true,
      },
    },
    {
      field: 'building.no_of.bedroom',
      sanitize: {
        trim: true,
      },
    },
    {
      field: 'building.no_of.bathroom',
      sanitize: {
        trim: true,
      },
    },
    {
      field: 'building.no_of.hall',
      sanitize: {
        trim: true,
      },
    },
    {
      field: 'price.value',
      sanitize: {
        trim: true,
      },
    },
    {
      field: 'tags',
      sanitize: {
        trim: true,
      },
    },
  ];
  validateHelper.sanitize(req, sanitizeArray);
  next();
};

validations.validateProperty = (req, res, next) => {
  const data = req.body;
  if (data.is_save == 'true') {
    let is_project = false;
    let is_land = false;
    if (data.is_project) {
      is_project = data.is_project;
    }
    const mainErrors = internal.validateTopData(data);
    let errors = mainErrors ? mainErrors : {};
    const basicError = internal.validateBasic(data && data.basic ? data.basic : {});
    if (basicError) errors.basic = basicError;
    if (!(errors.basic && errors.basic.property_category)) {
      if (data.basic.property_category === '5d662c7b8f12c7035cd39315') {
        is_land = true;
      }
    }
    const addressError = internal.validateAddress(data && data.address ? data.address : {}, is_land);
    if (addressError) errors.address = addressError;
    const locationPropertyError = internal.validateLocationProperty(data && data.location_property ? data.location_property : {}, is_land);
    if (locationPropertyError) errors.location_property = locationPropertyError;
    const buildingError = internal.validateBuilding(data && data.building ? data.building : {}, is_land);
    if (buildingError) errors.building = buildingError;
    const mediaError = internal.validateMedia(data && data.media ? data.media : {});
    if (mediaError) errors.media = mediaError;
    if (data.price && data.price.is_price_on_call) {
    } else {
      if (!is_project) {
        const priceError = internal.validatePrice(data && data.price ? data.price : {});
        if (priceError) errors.price = priceError;
      }
      if (is_project) {
        const errorOfPRoject = internal.validateProject(data);
        if (errorOfPRoject) errors = { ...errors, ...errorOfPRoject };
      }
    }
    if (!isEmpty(errors)) {
      const error = `${Object.keys(errors) && Object.keys(errors)[0]} required`;
      return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, errors, error, null);
    } else {
      next();
    }
  } else {
    if (data.address) {
      if (data.address.area_id == '') {
        delete req.body.address.area_id;
      }
      if (data.address.city_id == '') {
        delete req.body.address.city_id;
      }
      if (data.address.district_id == '') {
        delete req.body.address.district_id;
      }
      if (data.address.house_no == '') {
        delete req.body.address.house_no;
      }
      if (data.address.state_id == '') {
        delete req.body.address.state_id;
      }
    }
    if (data.basic) {
      if (data.basic.property_category == '') {
        delete req.body.basic.property_category;
      }
      if (data.basic.property_purpose == '') {
        delete req.body.basic.property_purpose;
      }
    }
    next();
  }
};

internal.validateProject = (data) => {
  let errors = {};
  if (data.project_features) {
    errors.project_features = internal.validateProjecFeatures(data.project_features);
    if (errors.project_features === undefined || errors.project_features.length == 0) {
      delete errors.project_features;
    }
  }
  //project_floor_plan
  // if (data.project_floor_plan) {
  //   errors.project_floor_plan = internal.validateProjecFlorePlans(data.project_floor_plan);
  //   if (errors.project_floor_plan === undefined || errors.project_floor_plan.length == 0) {
  //     delete errors.project_floor_plan;
  //   }
  // }
  // Payement Plan
  if (data.project_payment_plan) {
    errors.project_payment_plan = internal.validateProjecFlorePlans(data.project_payment_plan);
    if (errors.project_payment_plan === undefined || errors.project_payment_plan.length == 0) {
      delete errors.project_payment_plan;
    }
  }
  return errors;
};
internal.validateProjecFlorePlans = (data) => {
  let errors = [];
  if (Array.isArray(data)) {
    data.map((prop) => {
      const propertiesError = internal.validateProjecFlorePlan(prop);
      if (propertiesError) errors.push(propertiesError);
    });
  } else {
    errors = 'Need Array of Object';
  }
  return errors;
};
internal.validateProjecFlorePlan = (data) => {
  let propValidate = [
    {
      field: 'image',
      validate: [
        {
          condition: 'IsEmpty',
          msg: contentConfig.validation.empty,
        },
        {
          condition: 'IsMongoId',
          msg: contentConfig.validation.mongoIderr,
        },
      ],
    },
    // {
    //   field: 'title',
    //   validate: [
    //     {
    //       condition: 'IsEmpty',
    //       msg: contentConfig.validation.empty,
    //     },
    //   ],
    // },
  ];
  const errors = otherHelper.validation(data, propValidate);

  if (!isEmpty(errors)) {
    return errors;
  } else {
    return null;
  }
};
internal.validateProjecFeatures = (data) => {
  let errors = [];
  if (Array.isArray(data)) {
    data.map((prop) => {
      const propertiesError = internal.validateProjecFeature(prop);
      if (propertiesError) errors.push(propertiesError);
    });
  } else {
    errors = 'Need Array of Object';
  }
  return errors;
};
internal.validateProjecFeature = (data) => {
  let propValidate = [
    {
      field: 'feature',
      validate: [
        {
          condition: 'IsEmpty',
          msg: contentConfig.validation.empty,
        },
        {
          condition: 'IsMongoId',
          msg: contentConfig.validation.mongoIderr,
        },
      ],
    },
    {
      field: 'value',
      validate: [
        {
          condition: 'IsEmpty',
          msg: contentConfig.validation.empty,
        },
      ],
    },
  ];
  const errors = otherHelper.validation(data, propValidate);

  if (!isEmpty(errors)) {
    return errors;
  } else {
    return null;
  }
};
internal.validateBasic = (data) => {
  let propValidate = [
    {
      field: 'title',
      validate: [
        {
          condition: 'IsEmpty',
          msg: contentConfig.validation.empty,
        },
      ],
    },
    {
      field: 'description',
      validate: [
        {
          condition: 'IsEmpty',
          msg: contentConfig.validation.empty,
        },
      ],
    },
    {
      field: 'property_purpose',
      validate: [
        {
          condition: 'IsEmpty',
          msg: contentConfig.validation.empty,
        },
        {
          condition: 'IsMongoId',
          msg: contentConfig.validation.mongoIderr,
        },
      ],
    },
    {
      field: 'property_type',
      validate: [
        {
          condition: 'IsEmpty',
          msg: contentConfig.validation.empty,
        },
        // {
        //   condition: 'IsMongoId',
        //   msg: contentConfig.validation.mongoIderr,
        // },
      ],
    },
    {
      field: 'property_category',
      validate: [
        {
          condition: 'IsEmpty',
          msg: contentConfig.validation.empty,
        },
        {
          condition: 'IsMongoId',
          msg: contentConfig.validation.mongoIderr,
        },
      ],
    },
  ];
  const errors = otherHelper.validation(data, propValidate);
  if (!isEmpty(errors)) {
    return errors;
  } else {
    return null;
  }
};

internal.validateAddress = (data, is_land) => {
  let propValidate = [
    {
      field: 'state_id',
      validate: [
        {
          condition: 'IsEmpty',
          msg: contentConfig.validation.empty,
        },
        {
          condition: 'IsMongoId',
          msg: contentConfig.validation.mongoIderr,
        },
      ],
    },
    {
      field: 'district_id',
      validate: [
        {
          condition: 'IsEmpty',
          msg: contentConfig.validation.empty,
        },
        {
          condition: 'IsMongoId',
          msg: contentConfig.validation.mongoIderr,
        },
      ],
    },
    {
      field: 'city_id',
      validate: [
        {
          condition: 'IsEmpty',
          msg: contentConfig.validation.empty,
        },
        {
          condition: 'IsMongoId',
          msg: contentConfig.validation.mongoIderr,
        },
      ],
    },
    {
      field: 'area_id',
      validate: [
        {
          condition: 'IsEmpty',
          msg: contentConfig.validation.empty,
        },
        {
          condition: 'IsMongoId',
          msg: contentConfig.validation.mongoIderr,
        },
      ],
    },
    // {
    //   field: 'house_no',
    //   validate: [
    //     {
    //       condition: 'IsEmpty',
    //       msg: contentConfig.validation.empty,
    //     },
    //   ],
    // },
  ];
  // if (!is_land) {
  //   propValidate = [
  //     ...propValidate,
  //     {
  //       field: 'house_no',
  //       validate: [
  //         {
  //           condition: 'IsEmpty',
  //           msg: contentConfig.validation.empty,
  //         },
  //       ],
  //     },
  //   ];
  // }
  const errors = otherHelper.validation(data, propValidate);
  if (!isEmpty(errors)) {
    return errors;
  } else {
    return null;
  }
};

internal.validateLocationProperty = (data, is_land) => {
  let propValidate = [
    {
      field: 'total_area_unit',
      validate: [
        {
          condition: 'IsEmpty',
          msg: contentConfig.validation.empty,
        },
        {
          condition: 'IsMongoId',
          msg: contentConfig.validation.mongoIderr,
        },
      ],
    },
    // {
    //   field: 'total_area',
    //   validate: [
    //     {
    //       condition: 'IsEmpty',
    //       msg: contentConfig.validation.empty,
    //     },
    //   ],
    // },

    {
      field: 'property_face',
      validate: [
        // {
        //   condition: 'IsEmpty',
        //   msg: contentConfig.validation.empty,
        // },
        {
          condition: 'IsMongoId',
          msg: contentConfig.validation.mongoIderr,
        },
      ],
    },
    {
      field: 'road_access_value',
      validate: [
        {
          condition: 'IsEmpty',
          msg: contentConfig.validation.empty,
        },
        {
          condition: 'isNumber',
          msg: contentConfig.validation.mongoIderr,
        },
      ],
    },
    {
      field: 'road_access_length_unit',
      validate: [
        {
          condition: 'IsEmpty',
          msg: contentConfig.validation.empty,
        },
        {
          condition: 'IsMongoId',
          msg: contentConfig.validation.mongoIderr,
        },
      ],
    },
    {
      field: 'road_access_road_type',
      validate: [
        // {
        //   condition: 'IsEmpty',
        //   msg: contentConfig.validation.empty,
        // },
        {
          condition: 'IsMongoId',
          msg: contentConfig.validation.mongoIderr,
        },
      ],
    },
  ];
  if (!is_land) {
    propValidate = [
      ...propValidate,
      // {
      //   field: 'built_area',
      //   validate: [
      //     {
      //       condition: 'IsEmpty',
      //       msg: contentConfig.validation.empty,
      //     },
      //   ],
      // },
      {
        field: 'built_area_unit',
        validate: [
          {
            condition: 'IsMongoId',
            msg: contentConfig.validation.mongoIderr,
          },
          {
            condition: 'IsEmpty',
            msg: contentConfig.validation.empty,
          },
          {
            condition: 'IsMongoId',
            msg: contentConfig.validation.mongoIderr,
          },
        ],
      },
    ];
  }
  const errors = otherHelper.validation(data, propValidate);
  if (!isEmpty(errors)) {
    return errors;
  } else {
    return null;
  }
};
internal.validateBuilding = (data, is_land) => {
  let propValidate = [
    {
      field: 'built_month',
      validate: [
        {
          condition: 'IsEmpty',
          msg: contentConfig.validation.empty,
        },
        {
          condition: 'IsNumber',
          msg: contentConfig.validation.isNumber,
        },
      ],
    },
    {
      field: 'calender_type',
      validate: [
        {
          condition: 'IsEmpty',
          msg: contentConfig.validation.empty,
        },
        {
          condition: 'IsMongoId',
          msg: contentConfig.validation.mongoIderr,
        },
      ],
    },
    {
      field: 'total_floor',
      validate: [
        {
          condition: 'IsEmpty',
          msg: contentConfig.validation.empty,
        },
        {
          condition: 'IsNumber',
          msg: contentConfig.validation.isNumber,
        },
      ],
    },
    {
      field: 'furnishing',
      validate: [
        // {
        //   condition: 'IsEmpty',
        //   msg: contentConfig.validation.empty,
        // },
        {
          condition: 'IsMongoId',
          msg: contentConfig.validation.mongoIderr,
        },
      ],
    },
  ];
  // if (!is_land) {
  //   propValidate = [
  //     ...propValidate,
  //     {
  //       field: 'built_year',
  //       validate: [
  //         {
  //           condition: 'IsEmpty',
  //           msg: contentConfig.validation.empty,
  //         },
  //         {
  //           condition: 'IsNumber',
  //           msg: contentConfig.validation.isNumber,
  //         },
  //         {
  //           condition: 'IsLength',
  //           option: 4,
  //           msg: contentConfig.validation.isYearlength,
  //         },
  //       ],
  //     },
  //   ];
  // }
  const errors = otherHelper.validation(data, propValidate);
  const BuildingNoOf = internal.validateBuildingNoOf(data && data.no_of ? data.no_of : {});
  if (BuildingNoOf) errors.no_of = BuildingNoOf;
  if (!isEmpty(errors)) {
    return errors;
  } else {
    return null;
  }
};
internal.validateBuildingNoOf = (data) => {
  let propValidate = [
    {
      field: 'kitchen',
      validate: [
        {
          condition: 'IsEmpty',
          msg: contentConfig.validation.empty,
        },
        {
          condition: 'IsNumber',
          msg: contentConfig.validation.isNumber,
        },
      ],
    },
    {
      field: 'dinningroom',
      validate: [
        {
          condition: 'IsEmpty',
          msg: contentConfig.validation.empty,
        },
        {
          condition: 'IsNumber',
          msg: contentConfig.validation.isNumber,
        },
      ],
    },
    {
      field: 'bedroom',
      validate: [
        {
          condition: 'IsEmpty',
          msg: contentConfig.validation.empty,
        },
        {
          condition: 'IsNumber',
          msg: contentConfig.validation.isNumber,
        },
      ],
    },
    {
      field: 'bathroom',
      validate: [
        {
          condition: 'IsEmpty',
          msg: contentConfig.validation.empty,
        },
        {
          condition: 'IsNumber',
          msg: contentConfig.validation.isNumber,
        },
      ],
    },
    {
      field: 'hall',
      validate: [
        {
          condition: 'IsEmpty',
          msg: contentConfig.validation.empty,
        },
        {
          condition: 'IsNumber',
          msg: contentConfig.validation.isNumber,
        },
      ],
    },
  ];
  const errors = otherHelper.validation(data, propValidate);
  if (!isEmpty(errors)) {
    return errors;
  } else {
    return null;
  }
};

//

internal.validateMedia = (data) => {
  let propValidate = [
    {
      field: 'images',
      validate: [
        {
          condition: 'IsEmpty',
          msg: contentConfig.validation.empty,
        },
      ],
    },
    {
      field: 'youtube_video_id',
      validate: [
        {
          condition: 'IsLength',
          option: 11,
          msg: contentConfig.validation.invalidYoutubeKey,
        },
      ],
    },
  ];
  const errors = otherHelper.validation(data, propValidate);
  if (!isEmpty(errors)) {
    return errors;
  } else {
    return null;
  }
};
//

internal.validatePrice = (data) => {
  let propValidate = [
    {
      field: 'value',
      validate: [
        {
          condition: 'IsEmpty',
          msg: contentConfig.validation.empty,
        },
        {
          condition: 'IsNumber',
          msg: contentConfig.validation.isNumber,
        },
      ],
    },
    {
      field: 'currency',
      validate: [
        {
          condition: 'IsEmpty',
          msg: contentConfig.validation.empty,
        },
        {
          condition: 'IsMongoId',
          msg: contentConfig.validation.mongoIderr,
        },
      ],
    },
    {
      field: 'label',
      validate: [
        {
          condition: 'IsEmpty',
          msg: contentConfig.validation.empty,
        },
        {
          condition: 'IsMongoId',
          msg: contentConfig.validation.mongoIderr,
        },
      ],
    },
  ];
  const errors = otherHelper.validation(data, propValidate);
  if (!isEmpty(errors)) {
    return errors;
  } else {
    return null;
  }
};

internal.validateTopData = (data) => {
  let propValidate = [
    {
      field: 'is_active',
      validate: [
        {
          condition: 'IsBoolean',
          msg: contentConfig.validation.empty,
        },
      ],
    },
    {
      field: 'is_featured',
      validate: [
        {
          condition: 'IsBoolean',
          msg: contentConfig.validation.empty,
        },
      ],
    },
    {
      field: 'is_premium',
      validate: [
        {
          condition: 'IsBoolean',
          msg: contentConfig.validation.empty,
        },
      ],
    },
    {
      field: 'is_negotiable',
      validate: [
        {
          condition: 'IsBoolean',
          msg: contentConfig.validation.empty,
        },
      ],
    },
    {
      field: 'is_verified',
      validate: [
        {
          condition: 'IsBoolean',
          msg: contentConfig.validation.empty,
        },
      ],
    },
    {
      field: 'tags',
      validate: [
        {
          condition: 'IsEmpty',
          msg: contentConfig.validation.empty,
        },
      ],
    },
  ];
  const errors = otherHelper.validation(data, propValidate);
  if (!isEmpty(errors)) {
    return errors;
  } else {
    return null;
  }
};
validations.propTypeValidate = (req, res, next) => {
  try {
    const data = req.body;
    const mainErrors = internal.validateTopProperType(data);
    let errors = mainErrors ? mainErrors : {};
    if (!errors.properties) {
      if (data.properties.length) {
        errors.properties = [];
        data.properties.map((prop) => {
          const propertiesError = internal.validateProperties(prop);
          if (propertiesError) errors.properties.push(propertiesError);
        });
      } else {
        errors.properties = 'Need Array of Object';
      }
    }
    if (errors.properties.length == 0) {
      delete errors.properties;
    }
    if (!isEmpty(errors)) {
      return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, errors, 'input error', null);
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
};
internal.validateTopProperType = (data) => {
  let propValidate = [
    {
      field: 'property_title',
      validate: [
        {
          condition: 'IsEmpty',
          msg: contentConfig.validation.empty,
        },
      ],
    },
    {
      field: 'property_type',
      validate: [
        {
          condition: 'IsEmpty',
          msg: contentConfig.validation.empty,
        },
      ],
    },
    {
      field: 'properties',
      validate: [
        {
          condition: 'IsEmpty',
          msg: contentConfig.validation.empty,
        },
      ],
    },
  ];
  const errors = otherHelper.validation(data, propValidate);
  if (!isEmpty(errors)) {
    return errors;
  } else {
    return {};
  }
};
internal.validateProperties = (data) => {
  let propValidate = [
    {
      field: 'id',
      validate: [
        {
          condition: 'IsEmpty',
          msg: contentConfig.validation.empty,
        },
        {
          condition: 'IsMongoId',
          msg: contentConfig.validation.mongoIderr,
        },
      ],
    },
    {
      field: 'start_date',
      validate: [
        {
          condition: 'IsDate',
          msg: contentConfig.validation.isDate,
        },
      ],
    },
    {
      field: 'end_date',
      validate: [
        {
          condition: 'IsDate',
          msg: contentConfig.validation.isDate,
        },
      ],
    },
  ];
  const errors = otherHelper.validation(data, propValidate);
  if (!isEmpty(errors)) {
    return errors;
  } else {
    return null;
  }
};
module.exports = validations;
