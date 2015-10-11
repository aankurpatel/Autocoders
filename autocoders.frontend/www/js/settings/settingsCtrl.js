angular.module('starter')
    .controller('settingsCtrl', function ($scope, $rootScope, $cordovaPush, $cordovaToast, $cordovaDialogs, $cordovaMedia, $ionicPlatform, $http) {
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

        $scope.pushNotification = { checked: true };

        
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
            switch (notification.event) {
                case 'registered':
                    if (notification.regid.length > 0) {
                        alert('registration ID = ' + notification.regid);
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


    });