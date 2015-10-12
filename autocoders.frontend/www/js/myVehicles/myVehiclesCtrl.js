angular.module('starter')
    .controller('myVehiclesCtrl', function ($scope, $location, vehicleApiProxy) {

        $scope.go = function(path) {
            $location.path(path);
        };

        vehicleApiProxy.getMyVehicles().then(function (response) {
            console.log(response)
            $scope.vehicles = response.data;
        },function(error) {
            console.log('error getting vehicles');

            console.log(error);
        });

        
    });