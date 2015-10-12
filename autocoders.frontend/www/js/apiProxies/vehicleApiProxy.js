angular.module('starter')
    .service('vehicleApiProxy', function ($log, $resource,  $http) {
        var self = this;

        self.saveVehicle = function() {
            $log.log('saving vehicle');

            return $resource('https://autocoders.azure-mobile.net/tables/vehicles/:taskId', { taskId: '@id' }, // binding to the table url
            {
                'update': { method: 'PATCH' } // adding an update function
            }
        );
        };
    });