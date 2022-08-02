const express = require('express');
const router = express.Router();

const contModule = require('../../modules/searchFilter/searchFilterController');
const { authentication, authorization } = require('../../middleware/authentication.middleware');

router.get('/', authorization, contModule.GetSearchFilter);
router.get('/:id', authorization, contModule.GetSearchFilterById);
router.post('/', authorization, contModule.PostSearchFilter);
router.delete('/:id', authorization, contModule.DeleteSearchFilter);

module.exports = router;
