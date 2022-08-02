const express = require('express');
const router = express.Router();

const enumValidation = require('./../../modules/enum/enumValidation');
const fileUpload = require('../../helper/upload.helper')('public/amenities/');
const uploader = fileUpload.uploader;

const dModule = require('../../modules/enum/enumController');
const { authorization, authentication } = require('../../middleware/authentication.middleware');

router.get(
  '/',
  //authorization, //authentication,
  dModule.GetAllEnumByGroup,
);
router.get(
  '/:type',
  dModule.GetEnum,
);
router.post(
  '/amenities',
  authorization, authentication,
  uploader.single('file'),
  enumValidation.sanitize,
  enumValidation.validation,
  dModule.SaveEnumAmenities,
);
router.post(
  '/:type',
  authorization, authentication,
  uploader.single('file'),
  enumValidation.sanitize,
  enumValidation.validation,
  dModule.SaveEnum,
);
router.get(
  '/:type/:id',
  authorization, //authentication,
  dModule.GetEnumDetail,
);
router.delete(
  '/:type/:id',
  authorization, authentication,
  dModule.DeleteEnum,
);

module.exports = router;
