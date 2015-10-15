/**
 * Created by singhap on 10/15/15.
 */
angular.module('starter')
  .controller('reserveCarCtrl', ['$scope','_','$state','$cordovaDatePicker','photoService','$cordovaCamera',
    function($scope,_, $state,$cordovaDatePicker,photoService,$cordovaCamera) {
      $scope.viewMakeReservation = false;
        $scope.showReservation = function(){
          $scope.viewMakeReservation= true;
        }

      var options = {
        date: new Date(),
        mode: 'date', // or 'time'
        minDate: new Date() - 10000,
        allowOldDates: true,
        allowFutureDates: false,
        doneButtonLabel: 'DONE',
        doneButtonColor: '#F2F3F4',
        cancelButtonLabel: 'CANCEL',
        cancelButtonColor: '#000000'
      };

      document.addEventListener("deviceready", function () {
        $cordovaDatePicker.show(options).then(function(date){
          alert(date);
        },function(err){
        });
      }, false);

      $scope.getPhoto = function(args) {
        document.addEventListener("deviceready", function () {
         $cordovaCamera.getPicture(photoService.captureImageOptions()).then(function (image) {
            alert(image);
            //var base64Image = photoService.getBase64Image(image);
           $scope.dlImageUrl = image;
          }, function (err) {
            alert(err);
          });

        }, false);
      };

    }]);

