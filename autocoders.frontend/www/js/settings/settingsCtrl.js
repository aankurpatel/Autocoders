angular.module('starter')
    .controller('settingsCtrl', function($scope, $rootScope, $cordovaPush, pushNotificationProxy, userApiProxy, logger, helper) {
        var androidConfig = {
            "senderID": "719651694151"
        };
        
        $scope.pushNotificationChange = function() {
            logger.log('Push Notification Change');

            if ($scope.pushNotificationToggle.checked) {
                register();
            } else {
                // remove registration
                unRegister();
            }

        };

        $scope.user = {};

        $scope.getNewAccountKey = function() {
            $scope.user.accountKey = makeid();
        };

        logger.log(window.localStorage['userprofile']);

        $scope.user = JSON.parse(window.localStorage['userprofile'] || '{}');
        $scope.user.accountKey = $scope.user.accountKey || helper.makeid();

        $scope.pushNotificationToggle = { checked: !!$scope.user.pushNotificationToken };

        function register() {
            logger.log('registering for token');
            document.addEventListener("deviceready", function() {
                $cordovaPush.register(androidConfig).then(function(result) {
                    // Success
                    console.log("Register success " + result);
                }, function(err) {
                    // Error
                });
            });
        };

        function unRegister() {
            // WARNING: dangerous to unregister (results in loss of tokenID)
            $cordovaPush.unregister(options).then(function(result) {
                // Success!
            }, function(err) {
                // Error
            });
        };

        $scope.sendNotification = function() {
            console.log('sending test notification');
            userApiProxy.getUserTokens($scope.user.accountKey).then(function (response) {
                var userTokens = [];
               
                userTokens = _.pluck(response.data, 'pushNotificationToken');
                userTokens = _.without(userTokens, $scope.user.pushNotificationToken);
                logger.log(userTokens);
                pushNotificationProxy.sendNotification({ message: 'test notification from GP', title: 'Autocoders Rock!', route: '#/app/playlists/5' }, userTokens);
            });
        };

        function loadUser() {
            logger.log('loading users');
            userApiProxy.getUserTokens('www').then(function (response) {
                logger.log(response.data);
                $scope.users = response.data;
            }, function(error) {
                logger.log('error getting users');
                logger.log(error);
            });

        }

        loadUser();

        $scope.saveUser = function () {
            logger.log('saving user');
            $scope.user.pushNotificationToken = window.localStorage['token'];

            window.localStorage['userprofile'] = JSON.stringify($scope.user);

            userApiProxy.saveUser($scope.user).then(function(response) {
                logger.log(response);
            }, function(error) {
                logger.log(error);
            });
        };
    });