var app = angular.module('starter');

app.controller('addEditVehicleCtrl', function($scope, $location, $cordovaBarcodeScanner, vehicleApiProxy, edmundsService) {
    $scope.selectedMake = '';
    $scope.selectedModel = '';
    $scope.makes = {};
    $scope.models = {};
    $scope.styles = {};
    
    $scope.vehicle = {
        vehicleStyle: '',
        year: '',
        make: $scope.selectedMake,
        model: $scope.selectedModel,
        vin: 'vin'
    };
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

    $scope.getModelByMake = function(selectedMake) {
        edmundsService.getAllModels(selectedMake.name)
            .success(function(data) {
                //alert(data);
                $scope.models = data.models;
            })
            .error(function(error) {
                $scope.status = 'Unable to load Models data: ' + error.message;
            });
    };

    $scope.getStyleByMakeModelYear = function (selectedMake, selectedModel, selectedYear) {
        //alert(selectedYear);
        edmundsService.getAllStyles(selectedMake.name, selectedModel.name, selectedYear)
            .success(function (data) {
               // alert(data.styles);
                $scope.styles = data.styles;
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

    $scope.saveVehicle = function() {
        vehicleApiProxy.saveVehicle($scope.vehicle)
            .then(function() {
                go('/app/myVehicles');
            });
    };

    var go = function(path) {
        $location.path(path);
    };

});

app.filter('yearRange', function () {
    return function (input, min, max) {
        min = parseInt(min); //Make string input int
        max = parseInt(max);
        for (var i = min; i < max; i++)
            input.push(i);
        return input;
    };
});