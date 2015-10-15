angular.module('starter')
    .controller('settingsCtrl', function ($scope, $rootScope, $cordovaPush, $cordovaToast, pushNotificationProxy, userApiProxy, logger, helper) {
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

        $scope.user = userApiProxy.getCurrentUser();

        $scope.pushNotificationToggle = { checked: !!$scope.user.pushNotificationToken };

        function register() {
            //logger.log('registering for token');
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
            userApiProxy.getAllUserTokens().then(function (response) {
                var userTokens = [];
               
                userTokens = _.pluck(response.data, 'pushNotificationToken');
                userTokens = _.without(userTokens, $scope.user.pushNotificationToken);
                logger.log(userTokens);
                pushNotificationProxy.sendNotification({ message: 'test notification from GP', title: 'Autocoders Rock!', route: 'app.myVehicles', data1: 'hello'}, userTokens);
            });
        };

        function loadUser() {
            //logger.log('loading users');
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
            userApiProxy.saveUser($scope.user).then(function (response) {
                $scope.user = response;
                logger.toast('Saved', 'short', 'center');
            });

        };
    });