/**
 * Created by nasakas on 10/12/2015.
 */
angular.module('starter')
.controller('locateVehiclesCtrl', function($scope, $http, $timeout, $stateParams) {
    /*<bing-map> directive options*/
    $scope.view = {};
    $scope.mapOptions = {};
    $scope.pushpin = {};
    $scope.pushpin.options = {};
    
    //Set vehicles
    $scope.view.vehicles = $stateParams.vehicles;
    //Set map defaults
    $scope.mapOptions.zoom = 13;
    $scope.mapOptions.mapType = 'r';
    $scope.mapOptions.options = {
        disablePanning: false,
        disableZooming: false
    };
    $scope.pushpin.events = {
        click: function() {
            alert('The click event is working fine!');
        }
    };

    $scope.onMapReady = function(map) {
        //This will return (0,0) because we havn't set the center yet
        console.log('Map loaded with center:' + map.getCenter());
        console.log($scope.view.vehicles);
    };
});
