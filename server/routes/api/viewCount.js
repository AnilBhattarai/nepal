const express = require('express');
const router = express.Router();
const viewCountController = require('../../modules/viewCount/viewCountController');
const { authorization, byPassAuthorization } = require('../../middleware/authentication.middleware');

router.post('/', byPassAuthorization, viewCountController.postViewCount);
router.get('/all', viewCountController.getAllPropertyViewCount);
router.get('/property/:id', viewCountController.getViewCountByProperty);
router.get('/user', authorization, viewCountController.getViewCountByUser);

module.exports = router;
