angular.module('starter')
    .service('taxonomyApiProxy', function ($log, $http) {
        var self = this;
        var url = 'https://autocoders.azure-mobile.net/tables/vehicles';

        self.getYears = function() {

        };

        self.getMakes = function (year) {

            // retruns promise
            
        };

        self.getModels = function(year, make) {

        };

        
    });