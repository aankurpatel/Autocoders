angular.module('starter')
    .controller('settingsCtrl', function($scope, $rootScope, $cordovaPush, pushNotificationProxy, userApiProxy, logger) {

        var androidConfig = {
//            "senderID": "api-project-405931835723"
            "senderID": "719651694151"
        };
        
        $scope.pushNotificationChange = function() {
            logger.log('Push Notification Change');

            if ($scope.pushNotificationToggle.checked) {
                register();
            } else {
                // remove registration
            }

        };
        $scope.accountKeyChange = function() {
            console.log('accountKeyChange');

            window.localStorage['accountKey'] = $scope.user.accountKey;
        };

        $scope.user = {  };

        $scope.getNewAccountKey = function() {
            $scope.user.accountKey = makeid();
        };

        function makeid() {
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

            for (var i = 0; i < 5; i++)
                text += possible.charAt(Math.floor(Math.random() * possible.length));

            window.localStorage['accountKey'] = text;

            return text;
        }

        $scope.user = {
            accountKey: window.localStorage['accountKey'] || makeid(),
            pushNotificationToken: window.localStorage['token']
        };
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

        logger.log('dsfdsfsfsdfsdfsd')
        $rootScope.$on('$cordovaPush:notificationReceived', function(event, notification) {
            alert('event wired')
            switch (notification.event) {
            case 'registered':
                if (notification.regid.length > 0) {
                    alert('registration ID = ' + notification.regid);
                    window.localStorage['token'] = notification.regid;
                    $scope.user.pushNotificationToken = notification.regid;
                    //pushNotificationProxy.subscribe({ token: notification.regid, accountKey: androidConfig.senderID });
                }
                break;

            case 'message':
                // this is the actual push notification. its format depends on the data model from the push server
                alert('message = ' + notification.message + ' msgCount = ' + notification.msgcnt);
                break;

            case 'error':
                alert('GCM error = ' + notification.msg);
                break;

            default:
                alert('An unknown GCM event has occurred');
                break;
            }
        });

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
//                userTokens = _.without(userTokens, $scope.user.pushNotificationToken);

                pushNotificationProxy.sendNotification('test notification from GP', userTokens);
            });
        };

        function loadUser() {
            userApiProxy.getUsers().then(function (response) {
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
            userApiProxy.saveUser($scope.user).then(function(response) {
                logger.log(response);

            }, function(error) {
                logger.log(error);
            });
        };
    });