const express = require('express');
const router = express.Router();

const popUpModule = require('../../modules/popup/popupController');
const popUpValidation = require('../../modules/popup/popupValidation');
const { authorization, authentication } = require('../../middleware/authentication.middleware');

router.get('/', authorization, /* authentication,  */ popUpModule.getPopup);
router.get('/dropdown/advertisement', authorization, /* authentication,  */ popUpModule.getPopupDropdown);
router.post('/', authorization, /* authentication,  */ popUpValidation.sanitize, popUpValidation.validation, popUpModule.SavePopup);
router.get('/:id', /* authentication, */ popUpModule.getPopupDetail);

router.delete('/:id', authorization, /* authentication, */ popUpModule.DeletePopup);
router.post('/multiple', authorization, authentication, popUpModule.selectMultipleData);

module.exports = router;
