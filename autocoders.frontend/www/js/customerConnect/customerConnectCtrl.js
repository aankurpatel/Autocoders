var app = angular.module('starter');
app.controller('customerConnectCtrl', function($scope, $cordovaBarcodeScanner, logger, $state) {
    $scope.scanCode = function () {
        document.addEventListener("deviceready", function() {
            $cordovaBarcodeScanner.scan()
                .then(function(result) {
                        //logger.log(result);
                        $rootScope.customerAcountKey = 'gRUIF';
                        $state.go('app.proposalList', {}, { reload: true });
                    },
                    function(error) {
                        alert("Scanning failed: " + error);
                    }
                );
        });
    };
});
