/**
 * Created by singhap on 10/12/15.
 */
angular.module('starter')
  .service('proposal', function() {
    var proposal;
      return {
          'selectedProposal': function(selProposal) {
              if (selProposal) {
                  proposal = selProposal;
              }
              return proposal;
          }
      };
  });
