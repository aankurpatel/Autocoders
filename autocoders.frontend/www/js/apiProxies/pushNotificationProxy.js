angular.module('starter')
    .service('pushNotificationProxy', function ($http, logger) {
        var self = this;

        self.subscribe = function (user) {
            if (!user.token) {
                throw new Error("user.token is missing.");
            }
            if (!user.accountKey) {
                throw new Error("user.accountKey is missing");
            }

            // send subscription to api
            alert('subscription added for ' + user);
        };

        self.unsubscribe = function(user) {
            if (!user.token) {
                throw new Error("user.token is missing.");
            }

            // send request to api

        };

       
        self.sendNotification = function (message, tokens) {
            console.log('sending notifications to tokens', tokens);

            var req = {
                url: "https://gcm-http.googleapis.com/gcm/send",
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'key=AIzaSyDtdD3KI-C4qGFwrtzfCZlr1RsChVSCd7c'
                },
                data: {
                    'registration_ids': tokens,
                    data: message
                }
            };

            $http(req).then(function(response) {
                logger.log(response);
            }, function (error) {
                logger.log(error);
            });

        };
    });