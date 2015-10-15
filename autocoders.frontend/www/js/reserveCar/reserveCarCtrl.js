/**
 * Created by singhap on 10/15/15.
 */
angular.module('starter')
  .controller('reserveCarCtrl', ['$scope','_','$state','$cordovaDatePicker',
    function($scope,_, $state,$cordovaDatePicker) {
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
    }]);

