/**
 * Created by nasakas on 10/12/2015.
 */
angular.module('starter')
.controller('locateVehiclesCtrl', function($scope, $http, $timeout, $stateParams, $state) {
    /*<bing-map> directive options*/
    $scope.view = {};
    $scope.mapOptions = {};
    $scope.mapOptions.mapType = 'r';
    $scope.mapOptions.options = {
      disablePanning: false,
      disableZooming: false
    };
    $scope.mapOptions.zoom = 13;

    //Set vehicles
    $scope.view.vehicles = $stateParams.vehicles;

    var locations = [];
    //Set map defaults

    $scope.pushpin = {};
    $scope.pushpin.options = {
        draggable: false
    };

    $scope.infobox = {};
    $scope.infobox.options = {
      offset: new Microsoft.Maps.Point(15,25),
      height: 50
    };
    $scope.infobox.visible = true;

    $scope.pushpin.events = {
      click: function() {
        $state.go("app.vehicleDetail");
      }
    };

    $scope.onMapReady = function(map) {
        //This will return (0,0) because we havn't set the center yet
        var boundaries = Microsoft.Maps.LocationRect.fromLocations(locations);
        map.setView({bounds: boundaries});
    };

    //Initialize
    (function(){
      $scope.view.vehicles.forEach(function(veh){
        locations.push(new Microsoft.Maps.Location(veh.latitude, veh.longitude));
      });
    })();
});
