angular.module('starter')
    .controller('browseVehiclesCtrl', function($scope,$cordovaGeolocation,$http) {

    var posOptions = {timeout: 10000, enableHighAccuracy: false};
    $cordovaGeolocation
      .getCurrentPosition(posOptions)
      .then(function (position) {
        $scope.lat  = position.coords.latitude
        $scope.long = position.coords.longitude
      }, function(err) {
        console.log(err);
      });

      $http({
        method: 'GET',
        url: '/someUrl',
        params: 'limit=10, sort_by=created:desc',
      }).then(function successCallback(response) {
      $scope.vehicles = response.data;
      }, function errorCallback(response) {
       console.log(response);
      });
    });
