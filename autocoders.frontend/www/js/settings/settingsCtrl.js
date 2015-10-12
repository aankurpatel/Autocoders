angular.module('starter')
    .controller('settingsCtrl', function ($scope, $rootScope, $cordovaPush, pushNotificationProxy) {
        
        var androidConfig = {
            "senderID": "api-project-405931835723"
        };
       
        $scope.pushNotificationChange = function () {
            console.log('Push Notification Change', $scope.pushNotification.checked);

            if ($scope.pushNotification.checked) {
                register();
            } else {

            }

        };

        $scope.pushNotification = { checked: !!window.localStorage['token'] };

        $scope.getNewAccountKey = function () {
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

        $scope.user = { accountKey: window.localStorage['accountKey'] || makeid() };
        
        function register() {
            document.addEventListener("deviceready", function() {
                $cordovaPush.register(androidConfig).then(function (result) {
                    // Success
                    console.log("Register success " + result);
                }, function (err) {
                    // Error
                });
            });
        };
        
        $rootScope.$on('$cordovaPush:notificationReceived', function (event, notification) {
            alert('event wired')
            switch (notification.event) {
                case 'registered':
                    if (notification.regid.length > 0) {
                        alert('registration ID = ' + notification.regid);
                        window.localStorage['token'] = notification.regid;
                        pushNotificationProxy.subscribe({ token: notification.regid, accountKey: androidConfig.senderID });
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

        $scope.notificationPreferenceChanged = function() {
            console.log($scope.notificationOn);

           
        };

        $scope.sendNotification = function () {
            console.log('sending test notification');

            pushNotificationProxy.sendNotification('test notification from GP', window.localStorage['token']);
        };
    });