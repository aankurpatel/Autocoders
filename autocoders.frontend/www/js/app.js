// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'ionic.service.core', 'starter.controllers', 'underscore', 'ngCordova', 'angularBingMaps', 'monospaced.qrcode'])
    .run(function ($ionicPlatform, $rootScope, $cordovaToast, $cordovaPush, userApiProxy, logger, $ionicPopup, $state) {
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

        function register() {
            document.addEventListener("deviceready", function() {
                $cordovaPush.register({
                    "senderID": "719651694151"
                }).then(function(result) {
                    // Success
                    console.log("Register success " + result);

                }, function(err) {
                    // Error
                });
            });
        };

        var userprofile = userApiProxy.getCurrentUser();


            register();

        // Notification Received
        $rootScope.$on('$cordovaPush:notificationReceived', function(event, notification) {
            //alert(JSON.stringify([notification]));
            switch (notification.event) {
            case 'registered':
                if (notification.regid.length > 0) {
                    userprofile.pushNotificationToken = notification.regid;
                    userApiProxy.saveUser(userprofile).then(function(response) {
                        logger.log(response);
                    }, function(error) {
                        logger.log(error);
                    });
                }
                break;
            case 'message':
                //alert(JSON.stringify(notification));
                var confirmPopup = $ionicPopup.confirm({
                    title: notification.payload.title,
                    template: notification.message
                });
                confirmPopup.then(function(res) {
                    if (res && notification.payload) {
                        var route = notification.payload.route;
                        var customerAccountKey = notification.payload.accountKey;
                        if (!customerAccountKey) {
                            $rootScope.customerAccountKey = customerAccountKey;
                        }
                        var data = notification.payload.data; //quote object from seller or buyer
                        if (route) {
                            //alert('navigate to:' + route + 'with data: ' + JSON.stringify(data));
                            $state.go(route, data,{reload:true});
                        }
                    } else {
                        // do nothing
                    }
                });
                break;

            case 'error':
                //alert('GCM error = ' + notification.msg);
                break;

            default:
                //alert('An unknown GCM event has occurred');
                break;
            }
        });
    })
    .config(function ($stateProvider, $urlRouterProvider, $httpProvider, angularBingMapsProvider) {
        $httpProvider.defaults.headers.common['X-ZUMO-APPLICATION'] = 'nJonQAsXZEMEStHVlzCpWpmuckaJnd90'; // add the application key
        $httpProvider.defaults.headers.common['Content-Type'] = 'Application/json';
        $httpProvider.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
        $httpProvider.defaults.headers.common['Access-Control-Allow-Methods'] = 'POST, GET, OPTIONS, PUT, PATCH';

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
                       templateUrl: 'js/myMaps/myVehiclesOnMap.html',
                       controller: 'locateVehiclesCtrl'
                   }
               },
               params: {'vehicles': null}
            })
            .state('app.StartQuote', {
               url: '/startQuote',
               views: {
                   'menuContent': {
                       templateUrl: 'js/quoteNegotiation/quote.html',
                       controller: 'quoteCtrl'
                   }
               },
               params: {'vehicle': null, 'quote': null}
            })
            .state('app.proposalList', {
              url: '/proposals',
              views: {
                'menuContent': {
                  templateUrl: 'js/proposals/proposalList.html',
                  controller: 'proposalListCtrl'
                }
              }
            })
            .state('app.customerConnect', {
                url: '/customerConnect',
                views: {
                    'menuContent': {
                        templateUrl: 'js/customerConnect/customerConnect.html',
                        controller: 'customerConnectCtrl'
                    }
                }
            })
            .state('app.proposalDetail', {
              url: '/proposalDetail',
              views: {
                'menuContent': {
                  templateUrl: 'js/proposals/proposalDetail.html',
                  controller: 'proposalDetailCtrl'
                }
              },
                params: {'proposal': null}
            })
             .state('app.quoteSubmitted', {
              url: '/quoteSubmitted',
              views: {
                'menuContent': {
                  templateUrl: 'js/quoteNegotiation/quoteSubmitted.html',
                  controller: 'quoteSubmittedCtrl'
                }
              }
            })
           .state('app.reserveCar', {
            url: '/reserveCar',
            views: {
              'menuContent': {
                templateUrl: 'js/reserveCar/reserveCar.html',
                controller: 'reserveCarCtrl'
              },
              params: {'quote': null}
            }
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
