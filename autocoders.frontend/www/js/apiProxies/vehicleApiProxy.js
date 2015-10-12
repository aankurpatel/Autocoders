angular.module('starter')
    .service('vehicleApiProxy', function ($log, $http, $q) {
        var self = this,
            url = "https://autocoders.azure-mobile.net/tables/vehicles";

        self.getVehicles = function () {

            return $http.get('https://autocoders.azure-mobile.net/tables/vehicles');
        };

        self.getMyVehicles = function () {
            console.log('getMyVehicles');
            var url = "https://autocoders.azure-mobile.net/tables/vehicles?$filter=(accountKey eq '" + window.localStorage['accountKey'] + "')";
            console.log(url);
            return $http.get(url);
        };

        self.saveVehicle = function (vehicle) {
            alert('saving vehicle')
            var deffered = $q.defer();
            vehicle.accountKey = window.localStorage['accountKey'];

            $log.log('saving vehicle');
            console.log(vehicle);

            $http.post(url, vehicle).then(function(response) {
                alert(response);
                deffered.resolve(response);
            }, function (error) {
               
                alert('error', error);
                deffered.reject(error);
            });

            return deffered.promise;

        };
    });