angular.module('starter')
  .controller('vehicleDetailCtrl', ['$scope','_','vehicle'
    ,function($scope,_,vehicleService) {
          $scope.vehicle = vehicleService.selectedVehicle();

    }]);

