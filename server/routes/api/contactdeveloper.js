const express = require('express');
const router = express.Router();

const contModule = require('../../modules/contactDeveloper/contactDevController');
const { authentication, authorization } = require('../../middleware/authentication.middleware');
const { sanitize, validate } = require('../../modules/contactDeveloper/contactDevValidation');

router.post('/', sanitize, validate, contModule.sendMessages);
router.get('/',  contModule.getAllmessageforadmin);


module.exports = router;
