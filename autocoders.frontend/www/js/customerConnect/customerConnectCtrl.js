var app = angular.module('starter');
app.controller('customerConnectCtrl', function ($scope, $cordovaBarcodeScanner, logger, $state, pushNotificationProxy, userApiProxy) {
    $scope.scanCode = function () {
        document.addEventListener("deviceready", function() {
            $cordovaBarcodeScanner.scan()
                .then(function (result) {
                        logger.log(result);
                        $scope.sendNotification(result.text);
                    },
                    function(error) {
                        alert("Scanning failed: " + error);
                    }
                );
        });
        
    };
    var user = userApiProxy.getCurrentUser();
    $scope.data = JSON.stringify( {
        token: (user.pushNotificationToken || 'notoken').substring(0, 40),
        accountKey: user.accountKey
    });

    logger.log($scope.data);

    $scope.sendNotification = function(pushNotificationTokenPart) {
        logger.log('sending connect notification');
        var sendToUser = userApiProxy.getUserForToken(pushNotificationTokenPart).then(function (response) {
            logger.log(response);
            logger.log(response.data.length);

            var userTokens = [];
               
            userTokens = _.pluck(response.data, 'pushNotificationToken');
            userTokens = _.without(userTokens, user.pushNotificationToken);
            logger.log(userTokens);
                pushNotificationProxy.sendNotification({
                    message: user.accountKey + ' want to connect.', title: 'Autocoders Rock!',
                    route: 'app.proposalList', accountKey: user.accountKey
                }, userTokens);
        });

    };
    var go = function (path) {
        $state.go(path);
    };
});
