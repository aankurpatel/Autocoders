/**
 * Created by nasakas on 10/12/2015.
 */
angular.module('starter')
.controller('locateVehiclesCtrl', function($scope, $http, $timeout, $stateParams) {
    /*<bing-map> directive options*/
    $scope.view = {};
    $scope.view.vehicles = $stateParams.vehicles;
    $scope.mapOptions = {};
    $scope.mapOptions.center = {latitude: 42.073326,longitude: -88.186176};
    // $scope.mapOptions.zoom = 15;
    $scope.mapOptions.mapType = 'r';
    $scope.mapOptions.options = {
        disablePanning: false,
        disableZooming: false
    };
    
    $scope.pushpin = {};
    $scope.pushpin.location = {latitude: 42.073326,longitude: -88.186176};
    $scope.pushpin.options = {
        draggable: true
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
