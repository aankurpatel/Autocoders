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
            var currentUser = $http.get(url + "?$filter=(id eq '" + user.id + "')");
            if (currentUser) {
                console.log('user found', currentUser);
            } else {
                console.log('inserting');

                user.accountKey = user.accountKey || helper.makeid();
                user.userId = user.userId || helper.makeid();
                
                $http.post(url, user).then(function(response) {
                    console.log(response.data);
                });

            }

            window.localStorage['userprofile'] = JSON.stringify(user);

        };

        self.saveDealer = function(dealer) {
            logger.log('saving dealer');
        };

        self.getCurrentUser = function () {
            var user = {};
            console.log('window.localStorage[userprofile]', window.localStorage['userprofile']);
            try {
                user = JSON.parse(window.localStorage['userprofile']);
            } catch(ex) {
                user =  {};
            }
            user.accountKey = user.accountKey || helper.makeid();
            return user;

        };

        self.getDealerProfile = function (accountKey) {
            logger.log('getting dealer profile');
            return {
                accountKey: 'test',
                adderss1: 'add 1'
            }
        };

        self.getUserTokens = function(accountKey) {
            return $http.get(url + "?$select=" + "pushNotificationToken&$filter=(accountKey eq '"+ accountKey + "')");
//            return $http.get(url + "?$select=" + "pushNotificationToken");
        }

        self.getAllUserTokens = function () {
            //return $http.get(url + "?$select=" + "pushNotificationToken&$filter=(accountKey eq '"+ accountKey + "')");
            return $http.get(url + "?$select=" + "pushNotificationToken");
        }
    });
