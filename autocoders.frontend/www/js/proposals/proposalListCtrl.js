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

                    proposals[key].vehicle = JSON.parse(value.vehicle);
                    proposals[key].buyerquote = JSON.parse(value.buyerquote);
                    proposals[key].sellerquote = JSON.parse(value.sellerquote);
                    proposals[key].buyer = JSON.parse(value.buyer);
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

