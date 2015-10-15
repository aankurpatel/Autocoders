/**
 * Created by singhap on 10/14/15.
 */
angular.module('starter')
  .controller('proposalDetailCtrl', ['$scope','_','proposal','$state','quoteApiProxy','pushNotificationService','vehicle',
    function($scope,_,proposalService, $state, quoteApiProxy,pushNotificationService, vehicle) {
      var proposal = proposalService.selectedProposal();
      //vehicle.featPrice = JSON.parse(JSON.stringify(eval("(" + vehicle.featPrice + ")")));
      $scope.proposal = proposal;
      $scope.navigateToList = function(){
        $state.go("app.proposalList");
      };
      $scope.showOffer = false;
      $scope.addOffer = function(){
        $scope.showOffer = true;
      };
      $scope.acceptOffer = function(){
        quoteApiProxy.addUpdateQuote($scope.proposal).then(
          function(response){
            var message =
            {message:"Message from Autocoders",
              title:"Hello, "+ $scope.proposal.buyer.firstName+"!! Your offer for "
              +$scope.proposal.vehicle.year+" " +$scope.proposal.vehicle.make+" " +$scope.proposal.vehicle.model+" "
              +$scope.proposal.vehicle.trim + " has been accepted.",
              quoteId:$scope.proposal.id,
              type:"Accepted"
            };
            pushNotificationService.sendNotification($scope.proposal.buyeraccesskey,message);
          }
        );
      };
      $scope.rejectOffer = function(){
        var message =
        { title:"Message from Autocoders",
          message:"Hello, "+ $scope.proposal.buyer.firstName+"!! Your offer for " +$scope.proposal.vehicle.year+" " +$scope.proposal.vehicle.make+" " +$scope.proposal.vehicle.model
          +" " +$scope.proposal.vehicle.trim + " has been rejected.",
          quoteId:$scope.proposal.id,
          type:"Rejected"
        };
        pushNotificationService.sendNotification($scope.proposal.buyeraccesskey,message);
      };
      $scope.sendQuote= function()
      {
        quoteApiProxy.addUpdateQuote($scope.proposal).then(
          function(response){
            var message =
            {message:"Message from Autocoders",
              title:"Hello, "+ $scope.proposal.buyer.firstName+"!! You have received an offer for "
                    +$scope.proposal.vehicle.year+ " " +$scope.proposal.vehicle.make+" " +
                    $scope.proposal.vehicle.model+ " " +$scope.proposal.vehicle.trim,
              quoteId:$scope.proposal.id,
              type:"Negotiating"
            };
            pushNotificationService.sendNotification($scope.proposal.buyeraccesskey,message);
          }
        );
      };
      $scope.gotoVehicleDetail = function(){
        vehicle.selectedVehicle($scope.proposal.vehicle);
        $state.go("app.vehicleDetail");
      }
    }]);

