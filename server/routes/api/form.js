const express = require('express');
const router = express.Router();
const formController = require('../../modules/form/formController');
const {sanitize,validation  } = require('../../modules/form/formValidation');
const { authorization,authentication } = require('../../middleware/authentication.middleware');

router.post('/' ,sanitize,validation,authorization, formController.postForm);

router.get('/' ,authorization,authentication, formController.getForm);

router.delete('/:id' ,authorization,authentication, formController.deleteForm);

router.get('/:id' ,authorization,authentication, formController.getFormDetail);

module.exports = router;