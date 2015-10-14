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
        // Notification Received
//        $scope.$on('$cordovaPush:notificationReceived', function (event, notification) {
//            switch (notification.event) {
//               
//                case 'message':
//                    // this is the actual push notification. its format depends on the data model from the push server
//                    //                    alert('message = ' + notification.message + ' msgCount = ' + notification.msgcnt);
//                    alert(notification.message.text, "Push Notification Received");
//                    //                    $cordovaToast
//                    //                        .show(notification.message.text, 'long', 'center')
//                    //                        .then(function(success) {
//                    //                            // success
//                    //
//                    //                        }, function(error) {
//                    //                            // error
//                    //                        });
//                    break;
//
//                case 'error':
//                    alert('GCM error = ' + notification.msg);
//                    break;
//
//                default:
//                    alert('An unknown GCM event has occurred');
//                    break;
//            }
//        });
        $scope.getNewAccountKey = function() {
            $scope.user.accountKey = makeid();
        };

        $scope.user = userApiProxy.getCurrentUser();

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
            userApiProxy.getAllUserTokens().then(function (response) {
                var userTokens = [];
               
                userTokens = _.pluck(response.data, 'pushNotificationToken');
                userTokens = _.without(userTokens, $scope.user.pushNotificationToken);
                logger.log(userTokens);
                pushNotificationProxy.sendNotification({ message: 'test notification from GP', title: 'Autocoders Rock!', route: '#/app/quote/5', data1: 'hello'}, userTokens);
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
            userApiProxy.saveUser($scope.user).then(function (response) {
                $scope.user = response;
                $cordovaToast.show('Saved', 'short', 'center');
            });

        };
    });