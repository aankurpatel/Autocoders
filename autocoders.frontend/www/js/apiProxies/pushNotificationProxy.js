angular.module('starter')
    .service('pushNotificationProxy', function () {
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
    });