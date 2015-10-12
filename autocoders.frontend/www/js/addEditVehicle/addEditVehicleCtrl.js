angular.module('starter')
<<<<<<< HEAD
    .controller('addEditVehicleCtrl', function($scope, $cordovaBarcodeScanner) {
        
       

=======
    .controller('addEditVehicleCtrl', function($scope, $cordovaBarcodeScanner, vehicleApiProxy) {
>>>>>>> b1cab1a46fff0deada3d506380c0c164b16f043f
        $scope.playlists = [
            { title: 'Honda Civic', id: 1 },
            { title: 'Toyota Corolla', id: 2 },
            { title: 'BMW 328 i', id: 3 },
            { title: 'BMW 328 Xi', id: 4 },
            { title: 'Audi A3', id: 5 },
            { title: 'Cheverolet Camaro', id: 6 },
            { title: 'Cehvrolet Corvette', id: 7 }
        ];
        $scope.vehicle = {
            vin: '',
            vehicleStyle:'',
            year: '',
            make: '',
            model: ''
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
            vehicleApiProxy.saveVehicle();
        };
    });