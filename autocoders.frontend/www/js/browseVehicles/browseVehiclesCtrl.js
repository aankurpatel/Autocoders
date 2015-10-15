angular.module('starter')
    .controller('browseVehiclesCtrl', ['locationService', 'getClosestVehicleApiProxy', 'vehicle', '$scope', '_', '$q', '$state',        
        function(locationService, getClosestVehicleApiProxy, vehicle, $scope, _, $q, $state) {

            function loadVehicles() {
                locationService.getCurrentLocation()
                    .then(function(results) {
                        getClosestVehicleApiProxy.getClosestVehicles(results)
                            .then(function(vehicles) {
                                if (vehicles && angular.isArray(vehicles)) {
                                    $scope.vehicles = vehicles;

                                    angular.forEach($scope.vehicles, function (value, key) {
                                        $scope.vehicles[key].imageUrl = value.imageUrl.replace(/[\'\[\] ]/g, '').split(',');
                                    });
                                }
                            });
                    });
            }

            loadVehicles();

            $scope.setselectedVehicle = function (selVehicle) {
                console.log(selVehicle)
                vehicle.selectedVehicle(selVehicle);
                $state.go("app.vehicleDetail");
            };

            $scope.doRefresh = function() {
                loadVehicles();
                $scope.$broadcast('scroll.refreshComplete');
                $scope.$apply();
            };

            $scope.navigateToMaps = function() {
                $state.go("app.LocateVehiclesOnMaps", { vehicles: $scope.vehicles });
            };


        }]);
    
