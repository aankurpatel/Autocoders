angular.module('starter')
    .service('vehicleApiProxy', function ($log, $http) {
        var self = this;
        self.getVehicles = function () {

            return $http.get('https://autocoders.azure-mobile.net/tables/vehicles');
        };

        self.saveVehicle = function(vehicle) {
            $log.log('saving vehicle');


        };
    });