var app = angular.module('starter');
app.controller('customerConnectCtrl', function ($scope, $cordovaBarcodeScanner, logger, $state, pushNotificationProxy, userApiProxy) {
    $scope.scanCode = function () {
        document.addEventListener("deviceready", function() {
            $cordovaBarcodeScanner.scan()
                .then(function (result) {
                        logger.log(result);
                        $rootScope.customerAcountKey = 'gRUIF';
                        //$state.go('app.proposalList');
                        $scope.sendNotification();
                    },
                    function(error) {
                        alert("Scanning failed: " + error);
                    }
                );
        });
        $scope.sendNotification();
    };
    $scope.sendNotification = function () {
        console.log('sending test notification');
        userApiProxy.getAllUserTokens().then(function (response) {
            var userTokens = [];

            userTokens = _.pluck(response.data, 'pushNotificationToken');
            logger.log(userTokens);
            pushNotificationProxy.sendNotification({ message: 'User want to connect', title: 'Autocoders Rock!', route: 'app.proposalList', data1: 'hello' }, userTokens);
        });
    };
    var go = function (path) {
        $state.go(path);
    };
});
