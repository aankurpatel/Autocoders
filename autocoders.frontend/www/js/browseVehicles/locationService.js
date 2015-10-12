/**
 * Created by singhap on 10/12/15.
 */
angular.module('starter')
  .service('locationService', function($cordovaGeolocation,$q) {
    return{
      'getCurrentLocation':function(){
        var defer = $q.defer();
        var location={lat:'42.064475',long:'-88.14858'};
        var posOptions = {timeout: 10000, enableHighAccuracy: false};
        $cordovaGeolocation
          .getCurrentPosition(posOptions)
          .then(function (position) {
            location.lat  = position.coords.latitude;
            location.long = position.coords.longitude;
            defer.resolve( location);
          }, function(err) {
            console.log(err);
            defer.resolve( location);
          });
        return defer.promise;
      }
    }
  });
