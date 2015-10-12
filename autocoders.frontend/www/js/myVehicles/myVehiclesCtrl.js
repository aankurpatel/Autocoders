angular.module('starter')
    .controller('myVehiclesCtrl', function ($scope, $location, vehicleApiProxy) {

        $scope.go = function(path) {
            $location.path(path);
        };

        vehicleApiProxy.getVehicles().then(function(response) {
            console.log(response)
            $scope.vehicles = response.data;
        });

        
    });