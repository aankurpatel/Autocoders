angular.module('starter')
    .controller('browseVehiclesCtrl', ['locationService','getClosestVehicleApiProxy','vehicle','$scope','_','$q','$state'
    ,function(locationService,getClosestVehicleApiProxy,vehicle,$scope,_,$q,$state) {

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

      $scope.setselectedVehicle= function(selVehicle)
      {
        vehicle.selectedVehicle(selVehicle);
        $state.go("app.vehicleDetail");
      }
    }]);
