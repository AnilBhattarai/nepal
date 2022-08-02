const express = require('express');
const router = express.Router();

const commentModule = require('../../modules/comment/commentController');
const { authorization, authentication } = require('../../middleware/authentication.middleware');
const { sanitizeComment, validateComment, sanitizeReply, validateReply } = require('../../modules/comment/commentValidation');

router.get('/comment/:cmntFor/:postId', commentModule.GetCommentPublicyBycmntForPostId); //respective post id of cmntFor
router.get('/comment/:cmntFor/:postId/user', authorization, commentModule.GetOwnCommentBycmntForPostId);
router.get('/', commentModule.GetComment); //this route is for admin
router.post('/', authorization, sanitizeComment, validateComment, commentModule.PostComment);
router.get('/own/detail', authorization, commentModule.GetOwnComments);
router.get('/detail/:cmntFor/:postId/:id', authorization, commentModule.GetOwnCommentDetailBycmntForPostId);
router.get('/one/:id', authorization, authentication, commentModule.GetCommentById);
router.post('/comment/:cmntFor/:postId', authorization, sanitizeComment, validateComment, commentModule.PostComment);
router.post('/approve', authorization, authentication, commentModule.ApproveComment);
router.post('/commentallapprove', authorization, commentModule.listofcommentVerify);
router.post('/reply/:id', authorization, sanitizeReply, validateReply, commentModule.PostReply);
router.get('/reply/:id', authorization, commentModule.GetReplyByComment);
router.get('/:blog', commentModule.GetCommentByBlog);
router.post('/disapprove', authorization, authentication, commentModule.DisApproveComment);
router.delete('/:id', authorization, authentication, commentModule.DeleteComment);

module.exports = router;
