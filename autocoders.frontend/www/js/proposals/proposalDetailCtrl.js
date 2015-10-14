/**
 * Created by singhap on 10/14/15.
 */
angular.module('starter')
  .controller('proposalDetailCtrl', ['$scope','_','proposal','$state',
    function($scope,_,proposalService, $state) {
      var proposal = proposalService.selectedProposal();
      //vehicle.featPrice = JSON.parse(JSON.stringify(eval("(" + vehicle.featPrice + ")")));
      $scope.proposal = proposal;
      $scope.navigateToList = function(){
        $state.go("app.proposalList");
      };
      $scope.showOffer = false;
      $scope.addOffer = function(){
        $scope.showOffer = true;
      }
    }]);

