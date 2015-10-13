// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'underscore', 'ngCordova', 'angularBingMaps'])
    .run(function($ionicPlatform) {
        $ionicPlatform.ready(function () {
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
            });
            //.state('app.myMaps', {
            //    url: '/locationMaps',
            //    views: {
            //        'menuContent': {
            //            templateUrl: 'js/myMaps/myTestMap.html',
            //            controller: 'locateDealersCtrl'
            //        }
            //    }
            //});
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
