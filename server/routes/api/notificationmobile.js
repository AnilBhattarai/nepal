const express = require('express');
const router = express.Router();

const notificationModule = require('../../modules/notificationmobile/notificationmobile');


router.get('/' , notificationModule.getUserhavingPushToken);



module.exports = router;
