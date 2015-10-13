/**
 * Created by singhap on 10/12/15.
 */
angular.module('starter')
  .factory('photoService', function($q,$cordovaImagePicker,$cordovaCamera) {

    return {
      getPicture: function() {
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
            correctOrientation:true
          };

          $cordovaCamera.getPicture(options);

        }, false);
      },

      uploadImages:function(){
        var options = {
          maximumImagesCount: 10,
          width: 800,
          height: 800,
          quality: 80
        };

        $cordovaImagePicker.getPictures(options);

      }
    }
  });
