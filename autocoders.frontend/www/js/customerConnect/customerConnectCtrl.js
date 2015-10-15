var app = angular.module('starter');
app.controller('customerConnectCtrl', function ($scope, $cordovaBarcodeScanner, logger, $state, pushNotificationProxy, userApiProxy) {
    $scope.scanCode = function () {
        document.addEventListener("deviceready", function() {
            $cordovaBarcodeScanner.scan()
                .then(function (result) {
                        logger.log(result);
                    //$state.go('app.proposalList');

                        var data = JSON.parse(result.text);
                        $scope.sendNotification(data.accountKey, data.pushNotificationToken);
                    },
                    function(error) {
                        alert("Scanning failed: " + error);
                    }
                );
        });
        
    };
    var user = userApiProxy.getCurrentUser();
    $scope.data = JSON.stringify({
        accountKey: user.accountKey,
        token: user.pushNotificationToken
    });

    $scope.sendNotification = function(accountKey, pushNotificationToken) {
        console.log('sending connect notification');
        pushNotificationProxy.sendNotification({ message: accountKey + ' want to connect.', title: 'Autocoders Rock!', route: 'app.proposalList', accountKey: accountKey }, [pushNotificationToken]);
    };
    var go = function (path) {
        $state.go(path);
    };
});
