/**
 * Created by singhap on 10/14/15.
 */
angular.module('starter')
  .controller('proposalListCtrl', ['proposal', '$scope', '_', '$q', '$state','quoteApiProxy','$rootScope', 'logger',
    function( proposal, $scope, _, $q, $state, quoteApiProxy,$rootScope, logger) {

      $scope.proposals =[];
      function loadProposals() {
        quoteApiProxy.getQuotesforDealer()
             .then(function(response) {
                $scope.proposals =[];
                var proposals = response.data;
                angular.forEach(proposals, function (value, key) {
                    var proposal = proposals[key];
                    proposal.vehicle = JSON.parse(value.vehicle);
                    proposal.buyerquote = JSON.parse(value.buyerquote);
                    proposal.sellerquote = JSON.parse(value.sellerquote);
                    proposal.buyer = JSON.parse(value.buyer);
                    logger.log(proposal.buyer.accountKey);
                    if($rootScope.customerAccountKey){//show all proposals from this user
                      if(proposal.buyer.accountKey ===$rootScope.customerAccountKey) {
                        $scope.proposals.push(proposal);
                      }
                    }else if(proposal.status ==="Negotiating")//only show Negotiating proposals
                    {
                      $scope.proposals.push(proposal);
                    }
                });
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

