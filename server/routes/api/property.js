const express = require('express');
const router = express.Router();

const propertyValidation = require('./../../modules/property/propertyValidation');
const offerValidation = require('./../../modules/property/offerValidation');
const dModule = require('../../modules/property/propertyController');
const { authorization, authentication } = require('../../middleware/authentication.middleware');

router.get('/', authorization, dModule.GetProperty);

router.post(
  '/',
  authorization, //authentication,
  // propertyValidation.sanitize,
  propertyValidation.validateProperty,
  dModule.SaveProperty,
);
router.get('/:id', authorization, dModule.GetPropertyDetail);
router.delete('/:id', authorization, authentication, dModule.DeleteProperty);

/**
 *
 * Public API
 *
 */

/**
 *
 * property by type
 *
 */
router.post(
  '/type',
  authorization,
  authentication,
  //propertyValidation.propTypeSanitize,
  propertyValidation.propTypeValidate,
  dModule.SavePropertyType,
);
router.get('/type/all', authorization, authentication, dModule.getAllPropertiesByType);

router.get('/type/:property_type', dModule.getPropertiesByPropType);
router.get('/type/:property_type/index.html', dModule.getPropertiesByPropTypeHTML);
router.get('/type/:property_type/new.html', dModule.getPropertiesByPropTypeHTMLNew);
router.get('/type/:property_type/new2.html', dModule.getPropertiesByPropTypeHTMLNew2);
router.get('/get_property/:property_id', dModule.getBypropertyId);
router.get('/get_project/:property_id', dModule.getByProjectId);

/**
 *
 *
 */
router.get('/public/data', dModule.GetPublicProperty);
router.get('/public/project', dModule.GetPublicProjects);
router.get('/public/data/:slug_url', dModule.GetPublicPropertyDetail);

router.get('/property/count', authorization, dModule.GetCount);

//offer route
router.post(
  '/offer/:propId',
  // authorization, //authentication,
  offerValidation.sanitize,
  offerValidation.validation,
  dModule.saveOffer,
);

router.get(
  '/offer/admin',
  authorization, //authentication,

  dModule.getOfferByAdmin,
);
router.get(
  '/offer/user',
  authorization, //authentication,

  dModule.getOfferByUser,
);
router.get('/offer/msgtoadmin', authorization, authentication, dModule.getOffermessageforadmin);
router.get('/offer/msgtouser', authorization, dModule.getOffermessageforuser);

router.get(
  '/offer/:propId',
  authorization, //authentication,

  dModule.getOfferByPropId,
);

router.get(
  '/offer/user/:offerId',
  authorization, //authentication,

  dModule.getOfferById,
);
router.get('/public/data/data/agencyProperty', dModule.GetPropertyOfAgency);

module.exports = router;
