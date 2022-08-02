const express = require('express');
const router = express.Router();

const leadModule = require('../../modules/lead/leadController');
const { authentication, authorization } = require('../../middleware/authentication.middleware');
const { sanitize, validate } = require('../../modules/lead/leadValidation');

router.get('/', authorization, authentication, leadModule.GetLead);
router.get('/:id', authorization, authentication, leadModule.GetLeadById);
router.post('/', authorization, authentication, sanitize, validate, leadModule.PostLead);
router.post('/assigntoagent', authorization, authentication, leadModule.AssignAgent);
router.get('/agent/lead', authorization, leadModule.getAgentLead);
router.post('/agent/lead', authorization, leadModule.AssignStatusByAgent);
router.post('/agent', authorization, leadModule.AddLeadByAgent);
router.delete('/:id', authorization, authentication, leadModule.DeleteLead);

module.exports = router;
