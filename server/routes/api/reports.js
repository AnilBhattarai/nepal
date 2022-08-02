const express = require('express');
const router = express.Router();

const reportController = require('../../modules/reports/reportsController');
const reportAgentController = require('../../modules/reports/reportsController_agent');
const { authorization } = require('../../middleware/authentication.middleware');

router.get('/property/total', authorization, reportController.getTotalProperty);
router.get('/property/entry/:day', authorization, reportController.getPropertyEntryInLastXDays);
router.get('/property/top/area/:no', authorization, reportController.getTopTenAreaByListing);
router.get('/property/category', authorization, reportController.getPropertyEntryByCategory);
router.get('/property/price/segment', authorization, reportController.getPropertyByPriceSegment);
router.get('/property/active-vs-sold', authorization, reportController.getActiveVsSoldProperty);
router.get('/property/pending/verify', authorization, reportController.getPendingProperty);
router.get('/property/top/agent', authorization, reportController.getTopTenAgent);

router.get('/agent/property/total', authorization, reportAgentController.getTotalProperty);
router.get('/agent/property/entry/:day', authorization, reportAgentController.getPropertyEntryInLastXDays);
router.get('/agent/property/top/area/:no', authorization, reportAgentController.getTopTenAreaByListing);
router.get('/agent/property/category', authorization, reportAgentController.getPropertyEntryByCategory);
router.get('/agent/property/price/segment', authorization, reportAgentController.getPropertyByPriceSegment);
router.get('/agent/property/active-vs-sold', authorization, reportAgentController.getActiveVsSoldProperty);
router.get('/agent/property/pending/verify', authorization, reportAgentController.getPendingProperty);
router.get('/agent/property/top/agent', authorization, reportAgentController.getTopTenAgent);

router.get('/user/signup/:day', authorization, reportController.getNoOfUser);
router.get('/blog/author', authorization, reportController.getPostByAuthor);

module.exports = router;
