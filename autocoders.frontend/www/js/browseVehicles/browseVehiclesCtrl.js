angular.module('starter')
    .controller('browseVehiclesCtrl', ['locationService','getClosestVehicleApiProxy','$scope','_','$q'
    ,function(locationService,getClosestVehicleApiProxy,$scope,_,$q) {

      var defer = $q.defer();

      locationService.getCurrentLocation()
        .then(function(results){
          getClosestVehicleApiProxy.getClosestVehicles(results)
            .then(function(vehicles)
            {
              if(vehicles && angular.isArray(vehicles))
              {
                $scope.vehicles = vehicles;
              }
            })
          });
    }]);
