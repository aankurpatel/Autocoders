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
                                }
                            });
                    });
            }


            loadVehicles();

            $scope.setselectedVehicle = function(selVehicle) {
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
    
