// const  fcm = require('fcm-notification');
// // const path = require('../config/nepalhomes-a00b9-firebase-adminsdk-rezsv-bdd67f7dd4.json');
// const FCM = new fcm(path);
// const pushNotificationController = {};
// // let token = 'token here';
 
//     // var message = {
//     //     data: {    //This is only optional, you can send any data
//     //         score: '850',
//     //         time: '2:45'
//     //     },
//     //     notification:{
//     //         title : 'Title of notification',
//     //         body : 'Body of notification'
//     //     },
//     //     token : token
//     //     };
//     pushNotificationController.send= (message) => {

//         FCM.send(message, function(err, response) {
//             if(err){
//                 console.log('error found', err);
//             }else {
//                 console.log('response here', response);
//             }
//         })
//  }

//  module.exports = pushNotificationController;