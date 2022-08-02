const express = require('express');
const router = express.Router();

const { authorization, authentication } = require('../../middleware/authentication.middleware');
const forumsModule = require('../../modules/forums/forumsController');
const forumsValidation = require('../../modules/forums/forumsValidation');

router.get('/admin', authorization, forumsModule.getForumsByAdmin);
router.get('/public', forumsModule.getForums);
router.get('/user', authorization, forumsModule.getForumsByUser);
router.get('/admin/:id', authorization, forumsModule.getForumsIdByAdmin);
router.get('/user/:id', authorization, forumsModule.getForumsIdByUser);
router.get('/public/:id', forumsModule.getForumsIdPublicy);
router.post('/', authorization, forumsValidation.sanitize, forumsValidation.validation, forumsModule.postForum);
router.post('/approve', authorization, forumsModule.Approveforums);
router.delete('/:id', authorization, forumsModule.DeleteForum);
module.exports = router;
