/**
 * Created by singhap on 10/12/15.
 */
angular.module('starter')
  .factory('photoService', function($q,$cordovaImagePicker,$cordovaCamera,$q) {
    function getBase64Image(imgSrc) {
      // Create an empty canvas element
      var image = document.getElementById("image");
      image.src = imgSrc;

      var canvas = document.createElement("canvas");
      canvas.width = 100;
      canvas.height = 100;

      // Copy the image contents to the canvas
      var ctx = canvas.getContext("2d");
      ctx.drawImage(image, 0, 0);

      // Copy the image contents to the canvas
      //var ctx = canvas.getContext("2d");
      //ctx.drawImage(img, 0, 0);
      // Get the data-URL formatted image
      // Firefox supports PNG and JPEG. You could check img.src to
      // guess the original format, but be aware the using "image/jpg"
      // will re-encode the image.
      try {
        var dataURL = canvas.toDataURL("image/jpeg",0.5);
      }
      catch(e)
      {
        alert("error:"+e);
      }
      alert("dataUrl:"+dataURL);
      var encodedPath = dataURL.replace(/^data:image\/(png|jpg|jpeg);base64,/, "");
      alert(encodedPath);
      return encodedPath;
    }


    return {
      getBase64Image:function(img)
      {
        return getBase64Image(img);
      },
      captureImage:function(){
        document.addEventListener("deviceready", function () {

          var options = {
            quality: 50,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.CAMERA,
            allowEdit: false,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 100,
            targetHeight: 100,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: true,
            correctOrientation: true
          };

          $cordovaCamera.getPicture(options);

        }, false);
      }
    };
  });
