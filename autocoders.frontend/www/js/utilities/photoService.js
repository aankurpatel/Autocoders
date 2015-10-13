/**
 * Created by singhap on 10/12/15.
 */
angular.module('starter')
  .factory('photoService', function($q,$cordovaImagePicker,$cordovaCamera,$q) {
    function getBase64Image(img) {
      // Create an empty canvas element
      var canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;

      // Copy the image contents to the canvas
      var ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);

      // Get the data-URL formatted image
      // Firefox supports PNG and JPEG. You could check img.src to
      // guess the original format, but be aware the using "image/jpg"
      // will re-encode the image.
      var dataURL = canvas.toDataURL("image/png");

      return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
    }


    return {
      getPicture: function(){

      var defer = $q.defer();
      document.addEventListener("deviceready", function () {

        var options = {
          quality: 50,
          destinationType: Camera.DestinationType.DATA_URL,
          sourceType: Camera.PictureSourceType.CAMERA,
          allowEdit: true,
          encodingType: Camera.EncodingType.JPEG,
          targetWidth: 100,
          targetHeight: 100,
          popoverOptions: CameraPopoverOptions,
          saveToPhotoAlbum: true,
          correctOrientation: true
        };

        $cordovaCamera.getPicture(options)
          .then(function (image) {
            var base64Image = getBase64Image(image);
            defer.resolve(base64Image);
          }, function (err) {
            console.log(err);
            defer.reject();
          });

      }, false);
      return defer.promise;
    },

      uploadImages:function () {
        var defer = $q.defer(),
          allImages = [];
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
              var base64Image = getBase64Image(results[i]);
              allImages.push(base64Image);
            }
            defer.resolve(allImages);
          }, function (err) {
            defer.reject();
            console.log(err);
          });
        return defer.promise;

      },

      getBase64Image:function(img)
      {
        return getBase64Image(img);
      }
    };
  });
