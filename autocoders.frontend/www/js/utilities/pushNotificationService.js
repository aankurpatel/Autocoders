angular.module('starter')
    .service('pushNotificationService', function (logger) {
      
        this.sendNotification = function (accountKey, message) {

            logger.log('sending message to account');
            logger.log(message);
        };

       

    });