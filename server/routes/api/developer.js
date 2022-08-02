const express = require('express');
const router = express.Router();

const { authentication, authorization } = require('../../middleware/authentication.middleware');
const dModule = require('../../modules/user/developerController');

// For Admin
router.post('/admin/verify', authorization, dModule.verify);

module.exports = router;
