angular.module('starter')
    .service('userApiProxy', function ($log, $http, logger, helper, $q) {
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
            var deffered = $q.defer();

            logger.log('saving user');
            console.log(user)
            console.log(url + "?$filter=(id eq '" + user.id + "')")
            $http.get(url + "?$filter=(id eq '" + user.id + "')").then(function(response) {
                if (response.data.length > 0) {
                    console.log('user found');
                    window.localStorage['userprofile'] = JSON.stringify(user);

                    $http.patch(url + "/" + user.id, user).then(function(response) {
                        console.log(response);
                        deffered.resolve(user);

                    });
                } else {
                    console.log('inserting');

                    user.accountKey = user.accountKey || helper.makeid();
                    user.userId = user.userId || helper.makeid();

                    $http.post(url, user).then(function (response) {
                        user = response.data;
                        console.log(user);
                        window.localStorage['userprofile'] = JSON.stringify(user);

                        deffered.resolve(user);
                    });
                }

              

            }, function (error) {
                console.log('error saving userprofile');
                console.log(error);
            });

            return deffered.promise;

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
