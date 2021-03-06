/**
 * Created by singhap on 10/15/15.
 */
angular.module('starter')
  .controller('reserveCarCtrl', ['$scope', '_', '$cordovaDatePicker', 'photoService', '$cordovaCamera', 'pushNotificationService', '$stateParams',
    function ($scope, _, $cordovaDatePicker, photoService, $cordovaCamera, pushNotificationService, $stateParams) {
        if ($stateParams.quote) {
          var tempquote = $stateParams.quote;
          tempquote.buyer = JSON.parse(JSON.stringify($stateParams.quote.buyer));
          tempquote.vehicle = JSON.parse(JSON.stringify($stateParams.quote.vehicle));
          $scope.quote = tempquote;
      }

      $scope.viewMakeReservation = false;
        $scope.showReservation = function() {
            $scope.viewMakeReservation = true;
        };


      $scope.newDate = "",$scope.timeSelected = false;
        $scope.scheduleTime = function() {
            var options = {
                date: new Date(),
                mode: 'date', // or 'time'
                minDate: new Date(),
                maxDate: new Date() + 1,
                allowOldDates: false,
                allowFutureDates: false,
                doneButtonLabel: 'DONE',
                doneButtonColor: '#F2F3F4',
                cancelButtonLabel: 'CANCEL',
                cancelButtonColor: '#000000'
            };
            var optionsTime = {
                date: new Date(),
                mode: 'time', // or 'time'
                minDate: new Date(),
                maxDate: new Date() + 1,
                allowOldDates: false,
                allowFutureDates: false,
                doneButtonLabel: 'DONE',
                doneButtonColor: '#F2F3F4',
                cancelButtonLabel: 'CANCEL',
                cancelButtonColor: '#000000'
            };
            var year, currDate, month, hour, minutes;
            document.addEventListener("deviceready", function() {
                $cordovaDatePicker.show(options).then(function(date) {
                    year = date.getYear();
                    currDate = date.getDate();
                    month = date.getMonth();
                    $cordovaDatePicker.show(optionsTime).then(function (time) {
                        hour = time.getHours();
                        minutes = time.getMinutes();
                        $scope.newDate = new Date(year, month, currDate, hour, minutes).toString("dddd, MMMM dd, yyyy h:mm:ss tt");
                        $scope.timeSelected = true;
                        sendNotification();
                    }, function(err) {
                    });

                }, function(err) {
                });
            }, false);
        };

        function sendNotification() {
        var message =
        {title:"Message from Autocoders",
          message:"Hello!!, "+ $scope.quote.buyer.name+" has scheduled test drive for "
          +$scope.quote.vehicle.year+ " " +$scope.quote.vehicle.make+" " +
          $scope.quote.vehicle.model+ " " +$scope.quote.vehicle.trim +" on "+$scope.newDate,
          data: { quote: $scope.quote },
          type:"Message"
        };
        pushNotificationService.sendNotification($scope.quote.vehicle.accountKey, message);
        

      };

      $scope.getPhoto = function(args) {
        document.addEventListener("deviceready", function () {
         $cordovaCamera.getPicture(photoService.captureImageOptions()).then(function (image) {
            //var base64Image = photoService.getBase64Image(image);
           $scope.dlImageUrl = image;
          }, function (err) {
            //alert(err);
          });

        }, false);
      };

    }]);

