angular.module('starter')
    .service('vehicleApiProxy', function ($log, $http, $q, logger) {
        var self = this,
            url = "https://autocoders.azure-mobile.net/tables/vehicles";

        self.getVehicles = function () {

            return $http.get('https://autocoders.azure-mobile.net/tables/vehicles');
        };

        self.getMyVehicles = function () {
            console.log('getMyVehicles');
            var url = "https://autocoders.azure-mobile.net/tables/vehicles?$filter=(accountKey eq '" + window.localStorage['accountKey'] + "')";
            logger.log(url);
            return $http.get(url);
        };

        self.saveVehicle = function (vehicle) {
            logger.log('saving vehicle')
            var deffered = $q.defer();
            vehicle.accountKey = window.localStorage['accountKey'];

            vehicle.make = vehicle.make.name;
            vehicle.model = vehicle.model.name;
            vehicle.style = vehicle.sytle.name;

            $log.log('saving vehicle');
            console.log(vehicle);

            $http.post(url, vehicle).then(function(response) {
                logger.log(response);
                deffered.resolve(response);
            }, function (error) {
               
                alert('error', error);
                deffered.reject(error);
            });

            return deffered.promise;

        };
    });