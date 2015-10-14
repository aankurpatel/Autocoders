﻿var app = angular.module('starter');


app.controller('addEditVehicleCtrl', function($scope, $location, $state, $cordovaBarcodeScanner, vehicleApiProxy, edmundsService,
                                              $cordovaToast,photoService,$cordovaImagePicker,$cordovaCamera) {
    $scope.selectedMake = '';
    $scope.selectedModel = '';
    $scope.makes = {};
    $scope.models = {};
    $scope.styles = {};
    $scope.vehicle = {};

    getAllMakes();

    function getAllMakes() {
        edmundsService.getAllMakes()
            .success(function(data) {
                $scope.makes = data.makes;
            })
            .error(function(error) {
                $scope.status = 'Unable to load Makes data: ' + error.message;
            });
    }

    $scope.getModelByMake = function() {
        edmundsService.getAllModels($scope.vehicle.make.name)
            .success(function(data) {
                //alert(data);
                $scope.models = data.models;
            })
            .error(function(error) {
                $scope.status = 'Unable to load Models data: ' + error.message;
            });
    };

    $scope.getStyleByMakeModelYear = function(selectedMake, selectedModel, selectedYear) {
        //alert(selectedYear);
        edmundsService.getAllStyles($scope.vehicle.make.name, selectedModel.name, selectedYear)
            .success(function(data) {
                // alert(data.styles);
                $scope.styles = data.styles;

            })
            .error(function(error) {
                $scope.status = 'Unable to load Styles data: ' + error.message;
            });
    };

    $scope.getTrueCost = function () {
        if (!$scope.vehicle.styleId) {
            $cordovaToast.show('Please enter zipcode and style to get the true cost', 'long', 'center');
            return;
        }
        //alert($scope.vehicle.styleId);
        //alert($scope.vehicle.zipcode);
        edmundsService.getTCO($scope.vehicle.styleId, $scope.vehicle.zipcode)
           .success(function (data) {
                //alert(data.value);
               $scope.vehicle.tco = data.value;
           })
           .error(function (error) {
               $scope.status = 'Unable to load Styles data: ' + error.message;
           });
    };

    $scope.startScan = function() {
        $cordovaBarcodeScanner.scan()
            .then(function(result) {
                var s = "Result: " + result.text + "<br/>" +
                    "Format: " + result.format + "<br/>" +
                    "Cancelled: " + result.cancelled;
                $scope.vehicle.vin = result.text;
            },
                function(error) {
                    alert("Scanning failed: " + error);
                }
            );
    };
  $scope.allImages = [];
  $scope.getPhoto = function(args) {
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

      $cordovaCamera.getPicture(options)
        .then(function (image) {
          //var base64Image = photoService.getBase64Image(image);
          alert(image);
          $scope.allImages.push(image);
        }, function (err) {
          console.log(err);
        });
    }, false);
  };

  $scope.uploadPhoto = function(args) {
    var allImages = [];
    var options = {
      maximumImagesCount: 10,
      width: 800,
      height: 800,
      quality: 80
    };

    $cordovaImagePicker.getPictures(options)
      .then(function (results) {

        for (var i = 0; i < results.length; i++) {
          var base64Image = photoService.getBase64Image(results[i]);
          $scope.allImages.push(base64Image);
        }
        alert($scope.allImages.toString());
      }, function (err) {
        console.log(err);
      });
  };

    $scope.saveVehicle = function() {
        vehicleApiProxy.saveVehicle($scope.vehicle)
            .then(function() {
                go('app.myVehicles');
            });
    };

    var go = function(path) {
        $state.go(path, {}, { reload: true });
    };

});

app.filter('yearRange', function() {
    return function(input, min, max) {
        min = parseInt(min); //Make string input int
        max = parseInt(max);
        for (var i = min; i < max; i++)
            input.push(i);
        return input;
    };
});
