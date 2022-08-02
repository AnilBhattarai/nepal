const express = require('express');
const router = express.Router();

const resourceModule = require('../../modules/resource/resourceController');
const { authentication, authorization } = require('../../middleware/authentication.middleware');
const { sanitize, validation } = require('../../modules/resource/resourceValidation');

router.get('/', authorization, authentication, resourceModule.GetResource);
router.get('/public', resourceModule.getPublicResource);
router.get('/:id', authorization, authentication, resourceModule.GetResourceById);
router.post('/', authorization, authentication, sanitize, validation, resourceModule.PostResource);
router.delete('/:id', authorization, authentication, resourceModule.DeleteResource);

module.exports = router;
