angular.module('starter')
    .controller('myVehiclesCtrl', function($scope, $location) {
        $scope.playlists = [
            { title: 'Honda Civic', id: 1 },
            { title: 'Toyota Corolla', id: 2 },
            { title: 'BMW 328 i', id: 3 },
            { title: 'BMW 328 Xi', id: 4 },
            { title: 'Audi A3', id: 5 },
            { title: 'Cheverolet Camaro', id: 6 },
            { title: 'Cehvrolet Corvette', id: 7 }
        ];

        $scope.go = function(path) {
            $location.path(path);
        };
    });