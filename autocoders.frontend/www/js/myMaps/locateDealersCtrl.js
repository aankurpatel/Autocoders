/**
 * Created by nasakas on 10/12/2015.
 */
angular.module('starter', ['ngMaps'])
  .controller('locateDealersCtlr', function($scope) {
    $scope.map = {
      center: [40.7, -74]
    }
    $scope.marker = {
      position: [40.7, -74]
    }
    //$scope.$on('mapInitialized', function (event, map) {
    //  map = {
    //    center: [39, -121],
    //    options: function () {
    //      return {
    //        streetViewControl: false,
    //        scrollwheel: false
    //      }
    //    },
    //    events: {
    //      click: function (e, map) {
    //        alert(e.latLng.lat() + " " + e.latLng.lng());
    //      }
    //    }
    //  };
    //})
  });
