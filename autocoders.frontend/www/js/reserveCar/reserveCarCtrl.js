/**
 * Created by singhap on 10/15/15.
 */
angular.module('starter')
  .controller('reserveCarCtrl', ['$scope','_','$state',
    function($scope,_, $state) {
      $scope.viewMakeReservation = false;
        $scope.showReservation = function(){
          $scope.viewMakeReservation= true;
        }
    }]);

