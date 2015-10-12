angular.module('starter')
    .controller('myVehiclesCtrl', function ($scope, $location, vehicleApiProxy) {

        $scope.go = function(path) {
            $location.path(path);
        };

        function loadVehicles() {
            vehicleApiProxy.getMyVehicles().then(function(response) {
                console.log(response)
                $scope.vehicles = response.data;
            }, function(error) {
                console.log('error getting vehicles');

                console.log(error);
            })
        };

        loadVehicles();

        $scope.doRefresh = function () {
            loadVehicles();
            $scope.$broadcast('scroll.refreshComplete');
            $scope.$apply()
        };

    });