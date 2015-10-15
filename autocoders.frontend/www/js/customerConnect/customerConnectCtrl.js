var app = angular.module('starter');
app.controller('customerConnectCtrl', function ($scope, $rootScope, $cordovaBarcodeScanner, logger, $state, pushNotificationProxy, userApiProxy) {
    $scope.scanCode = function () {
        document.addEventListener("deviceready", function() {
            $cordovaBarcodeScanner.scan()
                .then(function (result) {
                    var data = result.text.split(';;')
                        logger.log(data);
                        var tokenPart = result.text.split(';;')[0];
                        logger.log(tokenPart);
                        var remoteUserAccountKey = result.text.split(';;')[1];

                        $rootScope.customerAccountKey = remoteUserAccountKey;
                        //$scope.sendNotification(tokenPart);
                        $state.go('app.proposalList', {}, {reload: true});
                    },
                    function(error) {
                        //alert("Scanning failed: " + error);
                    }
                );
        });

    };
    var user = userApiProxy.getCurrentUser();
    $scope.data =  (user.pushNotificationToken || 'notoken').substring(0, 40) + ';;' + user.accountKey;

    logger.log($scope.data);

    $scope.sendNotification = function(pushNotificationTokenPart) {
        logger.log('sending connect notification');
       userApiProxy.getUserForToken(pushNotificationTokenPart).then(function (response) {
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
