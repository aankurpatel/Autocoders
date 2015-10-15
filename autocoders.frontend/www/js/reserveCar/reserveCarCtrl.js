/**
 * Created by singhap on 10/15/15.
 */
angular.module('starter')
  .controller('reserveCarCtrl', ['$scope','_','$state','$cordovaDatePicker','photoService','$cordovaCamera','pushNotificationService','$stateParams',
    function($scope,_, $state,$cordovaDatePicker,photoService,$cordovaCamera,pushNotificationService,$stateParams) {
      if ($stateParams.quote) {
        $scope.quote = $stateParams.quote;
      }

      $scope.viewMakeReservation = false;
      $scope.showReservation = function(){
        $scope.viewMakeReservation= true;
      }


      $scope.newDate = "",$scope.timeSelected = false;
      $scope.scheduleTime= function(){
        var options = {
          date: new Date(),
          mode: 'date', // or 'time'
          minDate: new Date(),
          maxDate: new Date() +1,
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
          maxDate: new Date() +1,
          allowOldDates: false,
          allowFutureDates: false,
          doneButtonLabel: 'DONE',
          doneButtonColor: '#F2F3F4',
          cancelButtonLabel: 'CANCEL',
          cancelButtonColor: '#000000'
        };
        var year,currDate,month,hour,minutes;
        document.addEventListener("deviceready", function () {
          $cordovaDatePicker.show(options).then(function(date){
            year = date.getYear();
            currDate = date.getDate();
            month = date.getMonth();
            $cordovaDatePicker.show(optionsTime).then(function(time){
              hour = time.getHours();
              minutes = time.getMinutes();
              $scope.newDate = new Date(year,month,currDate,hour,minutes).toString("dddd, MMMM dd, yyyy h:mm:ss tt");
              $scope.timeSelected =  true;
              sendNotification();
            },function(err){
            });

          },function(err){
          });
        }, false);
      }

      function sendNotification(){
        var message =
        {message:"Message from Autocoders",
          title:"Hello!!, "+ $scope.quote.buyer.name+"has scheduled test drive for "
          +$scope.quote.vehicle.year+ " " +$scope.quote.vehicle.make+" " +
          $scope.quote.vehicle.model+ " " +$scope.quote.vehicle.trim +" on "+$scope.timeSelected,
          quoteId:$scope.quote.id,
          data:{quote:$scope.quote},
          type:"Message"
        };
        pushNotificationService.sendNotification($scope.proposal.buyer.accountKey,message);
      }
      $scope.getPhoto = function(args) {
        document.addEventListener("deviceready", function () {
         $cordovaCamera.getPicture(photoService.captureImageOptions()).then(function (image) {
            //var base64Image = photoService.getBase64Image(image);
           $scope.dlImageUrl = image;
          }, function (err) {
            alert(err);
          });

        }, false);
      };

    }]);

