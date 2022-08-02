const express = require('express');
const router = express.Router();

const requestModule = require('../../modules/myRequest/myRequestController');
const { authentication, authorization } = require('../../middleware/authentication.middleware');
const { sanitize, validate } = require('../../modules/myRequest/myRequestValidation');

router.post('/', sanitize, validate, requestModule.PostmyRequest);
router.get('/', authorization, requestModule.GetmyRequest);
router.get('/admin', authorization, authentication, requestModule.GetAllRequest,);
router.get('/public', requestModule.GetPublicRequest);
router.get('/:id', authorization, authentication, requestModule.GetmyRequestById,);
router.delete('/:id', authorization, authentication, requestModule.DeleteMyRequest,);
router.post('/approve', authorization, authentication, requestModule.ApproveMyRequest);


module.exports = router;
