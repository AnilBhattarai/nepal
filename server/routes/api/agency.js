const express = require('express');
const router = express.Router();
const fileUpload = require('../../helper/upload.helper')('public/agency/');
const uploader = fileUpload.uploader;

const agencyValidation = require('./../../modules/agency/agencyValidation');

const dModule = require('../../modules/agency/agencyController');
const { authorization, authentication } = require('../../middleware/authentication.middleware');

router.get('/', authorization, dModule.GetAgencies);
router.get('/getAgentOfAgency/:id' , dModule.getAgentOfagency);
router.get('/getall/dropdown' , dModule.getAgenciesList);
router.get('/user', authorization, dModule.GetAgenciesOfUser);
router.get('/public', dModule.GetPublicAgencies);
router.get('/public/:id', dModule.GetAgencyDetailForPublic);
router.post('/', authorization,authentication, uploader.single('file'), agencyValidation.sanitize, agencyValidation.validation, dModule.SaveAgency);
router.get('/:id', authorization, authentication, dModule.GetAgencyDetail);
router.get('/key/:key', dModule.GetAgencyByKey);
router.delete('/:id', authorization, authentication, dModule.DeleteAgency);

// For Admin
router.post('/admin/verify', authorization,authentication, dModule.verifyAgency);

module.exports = router;
