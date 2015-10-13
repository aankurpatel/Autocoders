/**
 * Created by singhap on 10/12/15.
 */
angular.module('starter')
  .factory('photoService', function($q,$cordovaImagePicker) {

    return {
      getPicture: function(options) {
        var q = $q.defer();

        navigator.camera.getPicture(function(result) {
          // Do any magic you need
          q.resolve(result);
        }, function(err) {
          q.reject(err);
        }, options);

        return q.promise;
      },

      uploadImages:function(){
        var options = {
          maximumImagesCount: 10,
          width: 800,
          height: 800,
          quality: 80
        };

        $cordovaImagePicker.getPictures(options)
          .then(function (results) {
            for (var i = 0; i < results.length; i++) {
              console.log('Image URI: ' + results[i]);
            }
          }, function(error) {
            // error getting photos
          });
      }
    }
  });
