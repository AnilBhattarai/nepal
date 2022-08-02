const express = require('express');
const router = express.Router();

const notificationModule = require('../../helper/pushnotification');


router.post('/sendone' , notificationModule.sendone);
router.post('/sendSelected', notificationModule.sendSelected); 
router.post('/sendAll' ,notificationModule.sendToAll);
router.get('/getnotificationdetail' , notificationModule.getPushNotificationList);



module.exports = router;
