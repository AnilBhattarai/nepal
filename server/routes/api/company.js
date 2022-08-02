const express = require('express');
const router = express.Router();

const companyModule = require('../../modules/company/companyController');
const { authorization, authentication } = require('../../middleware/authentication.middleware');
const { sanitize ,validate } = require('../../modules/company/companyValidation');


router.get('/',authorization,authentication, companyModule.getCompany); 
router.post('/' ,sanitize,validate,authorization,authentication,companyModule.saveCompany);
router.get('/:id', companyModule.getCompanyDetail);
router.delete('/:id',authorization,authentication, companyModule.deleteCompany);


module.exports = router;
