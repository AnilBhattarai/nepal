const express = require('express');
const router = express.Router();

const fedModule = require('../../modules/feedback/feedbackController');
const { authorization, authentication } = require('../../middleware/authentication.middleware');
const { validate } = require('../../modules/feedback/feedbackValidation');

router.post('/', authorization, validate, fedModule.postFeedback);
router.get('/admin' , authorization ,authentication, fedModule.getReviewForAdmin);


module.exports = router;