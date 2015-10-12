angular.module('starter')
    .controller('browseVehiclesCtrl', ['locationService','getClosestVehicleApiProxy','$scope',
    ,function(locationService,$scope) {
      locationService.getCurrentLocation()
        .then(function(results){
          var vehicles = getClosestVehicleApiProxy.getClosestVehicles(results)});

    }]);
