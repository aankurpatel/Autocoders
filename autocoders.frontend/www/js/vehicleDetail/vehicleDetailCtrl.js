angular.module('starter')
  .controller('vehicleDetailCtrl', ['$scope','_','vehicle','$state', 
    function($scope,_,vehicleService, $state) {
          var vehicle = vehicleService.selectedVehicle();
          //vehicle.featPrice = JSON.parse(JSON.stringify(eval("(" + vehicle.featPrice + ")")));
          $scope.vehicle = vehicle;
          $scope.NavigateToQuote = function(){
            $state.go("app.StartQuote", {vehicle: $scope.vehicle});
          };
    }]);

