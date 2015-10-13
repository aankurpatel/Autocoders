// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic','ionic.service.core', 'starter.controllers', 'underscore', 'ngCordova', 'angularBingMaps'])
    .run(function($ionicPlatform, $rootScope) {
        $ionicPlatform.ready(function () {
            Ionic.io();

            // this will give you a fresh user or the previously saved 'current user'
            var user = Ionic.User.current();

            // if the user doesn't have an id, you'll need to give it one.
            if (!user.id) {
                user.id = Ionic.User.anonymousId();
                // user.id = 'your-custom-user-id';
                user.set('name', 'gpatel');
            }

            //persist the user
            user.save();

            var push = new Ionic.Push({
                "debug": true
            });

            push.register(function (token) {
                console.log("Device token:", token.token);
            });

            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);
                console.log("test passes");
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
              console.log("test fails");
            }
        });

        // Notification Received
        $rootScope.$on('$cordovaPush:notificationReceived', function (event, notification) {
            console.log(JSON.stringify([notification]));
            switch (notification.event) {
                case 'registered':
                    if (notification.regid.length > 0) {
                        alert('registration ID = ' + notification.regid);
                        window.localStorage['token'] = notification.regid;
//                        $scope.user.pushNotificationToken = notification.regid;
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
    })
    .config(function ($stateProvider, $urlRouterProvider, $httpProvider, angularBingMapsProvider) {
        $httpProvider.defaults.headers.common['X-ZUMO-APPLICATION'] = 'nJonQAsXZEMEStHVlzCpWpmuckaJnd90'; // add the application key
        $httpProvider.defaults.headers.common['Content-Type'] = 'Application/json';
        $httpProvider.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

        $stateProvider
            .state('app', {
                url: '/app',
                abstract: true,
                templateUrl: 'templates/menu.html',
                controller: 'AppCtrl'
            })
            .state('app.browse', {
                url: '/browse',
                views: {
                    'menuContent': {
                        templateUrl: 'js/browseVehicles/browse.html',
                        controller:"browseVehiclesCtrl"
                    }
                }
            })
            .state('app.myVehicles', {
                url: '/myVehicles',
                views: {
                    'menuContent': {
                        templateUrl: 'js/myVehicles/myVehicles.html',
                        controller: 'myVehiclesCtrl'
                    }
                }
            }, {
                reload: true
            })
            .state('app.addEditVehicle', {
                url: '/addEditVehicle',
                views: {
                    'menuContent': {
                        templateUrl: 'js/addEditVehicle/addEditVehicle.html',
                        controller: 'addEditVehicleCtrl'
                    }
                }
            })
            .state('app.vehicleDetail', {
              url: '/vehicleDetail',
              views: {
                'menuContent': {
                  templateUrl: 'js/vehicleDetail/vehicleDetail.html',
                  controller: 'vehicleDetailCtrl'
                }
              }
            })
            .state('app.settings', {
                url: '/settings',
                views: {
                    'menuContent': {
                        templateUrl: 'js/settings/settings.html',
                        controller: 'settingsCtrl'
                    }
                }
            })
            .state('app.LocateVehiclesOnMaps', {
               url: '/locationMaps',
               views: {
                   'menuContent': {
                       templateUrl: 'js/myMaps/myVeiclesOnMap.html',
                       controller: 'locateVehiclesCtrl'
                   }
               },
               params: {'vehicles': null}
            });
        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/browse');
        
        //Register Bing-Maps & set default options
        angularBingMapsProvider.setDefaultMapOptions({
            credentials: 'AqWNccwBVcI7iRPX___tij6sHF1VtSOK9J9CD8e9R1kSx3fRYZsoFTSSCxkcQygM',
            enableClickableLogo: false
        });
    });

var underscore = angular.module('underscore', []);
underscore.factory('_', ['$window', function($window) {
  return $window._; // assumes underscore has already been loaded on the page
}]);