angular.module('starter')
    .controller('browseVehiclesCtrl', function($scope) {
    try {
      window.cordova.plugins.locationServices.geolocation.getCurrentPosition(geolocationSucces);
    }
    catch(ex){
      alert('window.cordova not available');
    }

    function geolocationSuccess(location){
      $scope.userLocation = location;
      alert($scope.userLocation.coords.latitude);
    }
    });
