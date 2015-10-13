angular.module('starter')
    .service('userApiProxy', function ($log, $http, logger) {
        var self = this;
        var url = 'https://autocoders.azure-mobile.net/tables/userprofile';

        self.create = function(user) {

        };

        self.getUsers = function () {
            logger.log('getting users');
            return $http.get(url);
        }

        self.saveUser = function (user) {
            logger.log(user);
            return $http.post(url, user);
        };

        self.getUserTokens = function(accountKey) {
            return $http.get(url);
        }
    });