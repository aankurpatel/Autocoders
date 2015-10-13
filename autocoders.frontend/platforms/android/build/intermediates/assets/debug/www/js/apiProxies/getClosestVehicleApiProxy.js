angular.module('starter')
    .service('getClosestVehicleApiProxy', function ($log, $http, $q) {
        var url = "https://autocoders.azure-mobile.net/api/getclosestvehicles",
            defaultRange = 50;

        return {
          'getClosestVehicles': function (results) {
            console.log('geting vehicles');
            var defer = $q.defer();
            $http({
              method: 'GET',
              url: url,
              params: {'latitude': results.lat, 'longitude': results.long, 'range': +defaultRange}
            }).then(function successCallback(response) {
              defer.resolve(response.data);
            }, function errorCallback(response) {
              console.log(response);
              defer.reject();
            });
            return defer.promise;
          }
        }
    });
