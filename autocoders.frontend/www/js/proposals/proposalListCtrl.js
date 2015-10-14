/**
 * Created by singhap on 10/14/15.
 */
angular.module('starter')
  .controller('proposalListCtrl', ['proposal', '$scope', '_', '$q', '$state','quoteApiProxy',
    function( proposal, $scope, _, $q, $state, quoteApiProxy) {

      $scope.proposals =[];
      function loadProposals() {
        quoteApiProxy.getQuotesforDealer()
             .then(function(response) {
                var proposals = response.data;
                angular.forEach(proposals, function (value, key) {
                  if(proposals[key].vehicle) {
                    proposals[key].vehicle.imageUrl = value.vehicle.imageUrl.replace(/[\'\[\] ]/g, '').split(',');
                  }
                });
                $scope.proposals = proposals;

               },function(err){
                  console.log(err);
              });




      }

      loadProposals();

      $scope.setSelectedProposal = function(selProposal) {
        proposal.selectedProposal(selProposal);
        $state.go("app.proposalDetail");
      };

      $scope.doRefresh = function() {
        loadProposals();
        $scope.$broadcast('scroll.refreshComplete');
        $scope.$apply();
      };
  }]);

