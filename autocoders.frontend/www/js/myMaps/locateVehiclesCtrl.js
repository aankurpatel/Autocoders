/**
 * Created by nasakas on 10/12/2015.
 */
angular.module('starter')
.controller('locateVehiclesCtrl', function($scope, $http, $timeout, $stateParams) {
    /*<bing-map> directive options*/
    $scope.view = {};
    $scope.mapOptions = {};
    $scope.mapOptions.center = {latitude: 42.073326,longitude: -88.186176};
    $scope.mapOptions.mapType = 'r';
    $scope.mapOptions.options = {
      disablePanning: false,
      disableZooming: false
    };
    $scope.mapOptions.zoom = 13;

    //Set vehicles
    $scope.view.vehicles = $stateParams.vehicles;
    //Set map defaults

    var locations = [];
    var locationRect;

    $scope.pushpin = {};
    $scope.pushpin.location = {latitude: 42.073326,longitude: -88.186176};
    $scope.pushpin.options = {
        draggable: false
    };
    $scope.pushpin.events = {
      click: function() {
        alert('The click event is working fine!');
        $scope.infobox.visible = !$scope.infobox.visible;
      }
    };

    $scope.infobox = {};
    $scope.infobox.options = {
      offset: new Microsoft.Maps.Point(0,25),
      height: 50
    };
    $scope.infobox.visible = true;

    $scope.onMapReady = function(map) {
        //This will return (0,0) because we havn't set the center yet
        console.log('Map loaded with center:' + map.getCenter())
        locationRect = new Microsoft.maps.LocationRect.fromLocations(locations);
        //new Microsoft.maps.setView({bounds: locationRect});

        console.log($scope.view.vehicles);
    };

    //Initialize
    (function(){
      $scope.view.vehicles.forEach(function(veh){
        locations.push(new Microsoft.Maps.Location(veh.latitude, veh.longitude));
      });
    })();
});
