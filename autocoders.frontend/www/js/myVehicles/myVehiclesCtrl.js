angular.module('starter')
    .controller('myVehiclesCtrl', function ($scope, $location, vehicleApiProxy, logger) {

        $scope.go = function(path) {
            $location.path(path);
        };

        function loadVehicles() {
            vehicleApiProxy.getMyVehicles().then(function(response) {
                logger.log(response)
                $scope.vehicles = response.data;
            }, function(error) {
                logger.log('error getting vehicles');

                logger.log(error);
            })
        };

        loadVehicles();

        $scope.doRefresh = function () {
            loadVehicles();
            $scope.$broadcast('scroll.refreshComplete');
            $scope.$apply();
        };

    });