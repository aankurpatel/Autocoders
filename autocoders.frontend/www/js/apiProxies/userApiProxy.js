angular.module('starter')
    .service('userApiProxy', function ($log, $http, logger, helper) {
        var self = this;
        var url = 'https://autocoders.azure-mobile.net/tables/userprofile';

        self.create = function(user) {
            throw new  Error('not implemented');
        };

        self.getUsers = function () {
            logger.log('getting users');
            return $http.get(url);
        }

        self.saveUser = function (user) {
            logger.log('saving user');
            logger.log(user);
            user.accountKey = user.accountKey || helper.makeid();

            return $http.post(url, user);
        };

        self.saveDealer = function(dealer) {
            logger.log('saving dealer');
        };

        self.getCurrentUser = function() {
            return JSON.stringify(window.localStorage['userprofile']);
        };

        self.getDealerProfile = function (accountKey) {
            logger.log('getting dealer profile');
            return {
                accountKey: 'test',
                adderss1: 'add 1'
            }
        };

        self.getUserTokens = function(accountKey) {
            //return $http.get(url + "?$select=" + "pushNotificationToken&$filter=(accountKey eq '"+ accountKey + "')");
            return $http.get(url + "?$select=" + "pushNotificationToken");
        }
    });