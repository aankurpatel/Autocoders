/**
 * Created by vamshi on 10/15/15.
 */
angular.module('starter')
  .controller('quoteSubmittedCtrl', ['$scope','$state', 
    function( $scope, $state) {
      $scope.GoHome = function(){
          $state.go("app.browse");
      };
  }]);