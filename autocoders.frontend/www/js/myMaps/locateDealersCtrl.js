/**
 * Created by nasakas on 10/12/2015.
 */
angular.module('starter')
.controller('locateDealersCtrl', function($scope, $http, $timeout) {
    /*<bing-map> directive options*/
    $scope.mapOptions = {};
    $scope.mapOptions.center = {latitude: 42.073326,longitude: -88.186176};
    $scope.mapOptions.zoom = 15;
    $scope.mapOptions.mapType = 'r';
    $scope.mapOptions.options = {
        disablePanning: false,
        disableZooming: false
    };
    $scope.onMapReady = function(map) {
        map.setView(new Microsoft.Maps.setView({}));
        //This will return (0,0) because we havn't set the center yet
        console.log('Map loaded with center:' + map.getCenter());
    };
});
