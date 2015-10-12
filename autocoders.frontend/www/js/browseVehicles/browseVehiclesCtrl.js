angular.module('starter')
    .controller('browseVehiclesCtrl', ['locationService','$scope','$cordovaGeolocation','$http','$q',function(locationService,$scope,$cordovaGeolocation,$http,$q) {

      var defaultRange = "25";
      var defer = $q.defer();
      locationService.getCurrentLocation().then(function(results){getClosestVehicles(results)});


    function getClosestVehicles(results){
      console.log('testing');
      $http({
          method: 'GET',
          url: 'https://autocoders.azure-mobile.net/api/getclosestvehicles',
          params: {'latitude':results.lat.toString(), 'longitude':results.long.toString(),'range':+defaultRange},
          headers: {
            'Content-Type': 'application/json',
            'X-ZUMO-APPLICATION': 'nJonQAsXZEMEStHVlzCpWpmuckaJnd90',
            'Access-Control-Allow-Origin':'*'
          }
        }).then(function successCallback(response) {
          $scope.vehicles = response.data;
          defer.resolve(response.data);
        }, function errorCallback(response) {
          console.log(response);
        });
      }
      return defer.promise;
    }]);
