angular.module('starter')
    .service('vehicleApiProxy', function ($log, $http, $q) {
        var self = this,
            url = "https://autocoders.azure-mobile.net/tables/vehicles";

        self.getVehicles = function () {

            return $http.get('https://autocoders.azure-mobile.net/tables/vehicles');
        };

        self.saveVehicle = function (vehicle) {
            var deffered = $q.defer();

            $log.log('saving vehicle');

            $http.post(url, vehicle).then(function(response) {
                console.log(response);
                deffered.resolve(response);
            }, function(error) {
                console.log('error', error);
                deffered.reject(error);
            });

            return deffered.promise;

        };
    });