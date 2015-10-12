angular.module('starter')
    .controller('browseVehiclesCtrl', ['locationService','getClosestVehicleApiProxy','$scope'
    ,function(locationService,getClosestVehicleApiProxy,$scope) {
      locationService.getCurrentLocation()
        .then(function(results){
          var vehicles = getClosestVehicleApiProxy.getClosestVehicles(results)});

    }]);
