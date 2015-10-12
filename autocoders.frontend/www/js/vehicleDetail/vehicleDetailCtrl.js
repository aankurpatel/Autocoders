angular.module('starter')
  .controller('vehicleDetailCtrl', ['$scope','_','vehicle'
    ,function($scope,_,vehicleService) {
          var vehicle = vehicleService.selectedVehicle();

    }]);

