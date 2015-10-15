angular.module('starter')
    .service('pushNotificationService', function (logger, pushNotificationProxy, userApiProxy) {
      
        this.sendNotification = function (accountKey, message) {
            
            console.log('sending message users of accountKey', accountKey);
            userApiProxy.getUserTokens(accountKey).then(function(response) {
                var userTokens = _.pluck(response.data, 'pushNotificationToken');
                userTokens = _.filter(userTokens, function(t) { return !!t && t.length > 10; });
                userTokens = _.without(userTokens, userApiProxy.getCurrentUser.pushNotificationToken);
                alert('userTokens: ' + userTokens + 'message: ' + message);
                pushNotificationProxy.sendNotification(message, userTokens);
            });
        };

       

    });