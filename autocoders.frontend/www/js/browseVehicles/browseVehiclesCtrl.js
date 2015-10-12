angular.module('starter')
    .controller('browseVehiclesCtrl', ['locationService','getClosestVehicleApiProxy','$scope','_'
    ,function(locationService,getClosestVehicleApiProxy,$scope,_) {
      locationService.getCurrentLocation()
        .then(function(results){
          var vehicles = getClosestVehicleApiProxy.getClosestVehicles(results)});
          if(vehicles)
          {

          }

    }]);
