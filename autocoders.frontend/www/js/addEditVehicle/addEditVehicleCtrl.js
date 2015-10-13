var app = angular.module('starter');


app.controller('addEditVehicleCtrl', function($scope, $location, $state, $cordovaBarcodeScanner, vehicleApiProxy, edmundsService, $cordovaToast,photoService) {
    $scope.selectedMake = '';
    $scope.selectedModel = '';
    $scope.makes = {};
    $scope.models = {};
    $scope.styles = {};
    $scope.selectedStyleId = '';
    $scope.zipcode = '';

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
        if (!$scope.vehicle.vehicleStyle) {
            $cordovaToast.show('Style must be selected for TCM', 'long', 'center');
            return;
        }
        //alert($scope.vehicle.vehicleStyle);
        //alert($scope.vehicle.zipcode);
        edmundsService.getTCO($scope.vehicle.vehicleStyle, $scope.vehicle.zipcode)
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

  $scope.getPhoto = function() {
    photoService.getPicture().then(function(imageURI) {
      console.log(imageURI);
      $scope.lastPhoto = imageURI;
    }, function(err) {
      console.err(err);
    }, {
      quality: 75,
      targetWidth: 320,
      targetHeight: 320,
      saveToPhotoAlbum: false
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
