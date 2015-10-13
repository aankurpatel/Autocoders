angular.module('starter')
  .controller('vehicleDetailCtrl', ['$scope','_','vehicle'
    ,function($scope,_,vehicleService) {
          var vehicle = vehicleService.selectedVehicle();
          vehicle.featPrice = JSON.parse(JSON.stringify(eval("(" + vehicle.featPrice + ")")));
          $scope.vehicle = vehicle;

    }]);

