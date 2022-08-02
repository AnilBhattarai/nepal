const express = require('express');
const router = express.Router();
const dModule = require('../../modules/staticData/staticController');
const nepalLocationController = require('../../modules/staticData/nepalLocationController');
const { authorization, authentication } = require('../../middleware/authentication.middleware');
const validations = require('./../../modules/staticData/staticValidation');

router.get('/district/:stateId', dModule.GetDisctrict);
router.get('/district/_id/:stateId', dModule.GetDisctrictByStateID);
router.get('/state', dModule.GetStates);
router.get('/municipality/:districtId', dModule.GetVdcMunicipality);
router.get('/municipality/_id/:districtId', dModule.GetVdcMunicipalityByDistrict);
router.get('/area/:municipalityID', dModule.GetArea);
router.get('/area/_id/:municipalityID', dModule.GetAreaByVdcMunicipality);

router.post(
  '/state/add',
  authorization,authentication,
  validations.sanitizeState,
  //validations.validateState,
  //validations.checkDuplicateState,
  dModule.postStates,
);
router.post('/district/add', authorization,authentication, validations.sanitizeDistrict, validations.validateDistrict, validations.checkDuplicateDistrict, dModule.postDistrict);
router.post('/municipality/add', authorization,authentication, validations.sanitizeMunicipality, validations.validateMunicipality, validations.checkDuplicateMunicipality, dModule.postMunicipality);
router.post('/area/add', authorization,authentication, validations.sanitizeArea, validations.validateArea, validations.checkDuplicateArea, dModule.postArea);

router.get('/state/detail/:id', authorization, dModule.getStateDetail);
router.get('/district/detail/:id', authorization, dModule.getDistrictDetail);
router.get('/municipality/detail/:id', authorization, dModule.getMunicipalityDetail);
router.get('/area/detail/:id', authorization, dModule.getAreaDetail);

router.delete('/municipality/remove/:id', authorization,authentication, dModule.deleteMunicipility);
router.delete('/area/remove/:id', authorization,authentication, dModule.deleteArea);

// New process

router.get('/nepal/all', nepalLocationController.getAllLocation); // state, district, vdc, area
router.get('/nepal/:level', nepalLocationController.getLocationList); // state, district, vdc, area
router.get('/nepal/:level/:id', nepalLocationController.getLocationDetail); // state, district, vdc, area
router.post('/nepal/:level', authorization,authentication, validations.sanitizeName, nepalLocationController.saveLocation); // state, district, vdc, area
router.post('/nepal/:level/active', authorization,authentication, nepalLocationController.changeActiveStatus); // state, district, vdc, area

module.exports = router;
