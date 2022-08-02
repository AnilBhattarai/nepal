const express = require('express');
const router = express.Router();

const contModule = require('../../modules/contactAgent/contactagentController');
const { authentication, authorization } = require('../../middleware/authentication.middleware');
const { sanitize, validate } = require('../../modules/contactAgent/contactagentValidation');

router.post('/', sanitize, validate, contModule.sendMessage);
router.get('/',  contModule.getAllmessageforadmin);



module.exports = router;
