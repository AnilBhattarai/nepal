const express = require('express');
const router = express.Router();
const fileUpload = require('../../helper/upload.helper')('public/careers/', ['.pdf','.doc','.docx']);
const uploader = fileUpload.uploader;
const { authorization, authentication } = require('../../middleware/authentication.middleware');
const careerModule = require('../../modules/careers/careersController');
const careerValidation = require('../../modules/careers/careersValidation')
router.get('/', careerModule.getCareers);
router.get('/:slug_url', careerModule.getCareersBySlug);
router.post('/apply',  uploader.single('cvFile'),careerValidation.sanitize, careerValidation.careersSeekerValidation,careerModule.PostDetails);
router.get('/admin/publisher',authorization,authentication,careerModule.getPostedCareers);
router.get('/admin/publisher/:id',authorization,authentication,careerModule.getPostedCareersById);
router.post('/admin/publisher',authorization,authentication, careerValidation.publisherSanitize, careerValidation.careersPublisherValidation,careerModule.postAdminCareers);
router.get('/admin/appliedusers',authorization,authentication, careerModule.getAppliedUsers);
router.get('/admin/appliedusers/:id',authorization,authentication, careerModule.getAppliedUserById);



module.exports = router;
