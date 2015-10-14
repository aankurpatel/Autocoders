/**
 * Created by singhap on 10/14/15.
 */
angular.module('starter')
  .controller('proposalListCtrl', ['proposal', '$scope', '_', '$q', '$state',
    function( proposal, $scope, _, $q, $state) {

      function loadProposals() {
        //locationService.getCurrentLocation()
        //  .then(function(results) {
        //    getClosestVehicleApiProxy.getClosestVehicles(results)
        //      .then(function(vehicles) {
        //        if (vehicles && angular.isArray(vehicles)) {
        //          $scope.vehicles = vehicles;
        //
        //          angular.forEach($scope.vehicles, function (value, key) {
        //            $scope.vehicles[key].imageUrl = value.imageUrl.replace(/[\'\[\] ]/g, '').split(',');
        //          });
        //        }
        //      });
        //  });
        $scope.proposals = [{
            buyer:{
              fisrtName:"John",
              lastName:"Burke",
              zip:"60172",
              phone:"8472340984",
              email:"john.burke@gmailTest.com"
            },
            vehicle:{
                make:"Honda",
                model:"Accord",
                year:"2015",
                trim:"EXL",
                type:"New",
                stockNo:"737243",
                imageUrl:"http://car-pictures.cars.com/images/?IMG=USC60ACS122A022002.jpg, http://images.cars.com/supersized/DMI/20/22138/05.jpg",
                vin:"DC0XPORUSAWREZBP8"
            },
            quote:{
                featPrice:"32000",
                taxRate:"5%",
                titleFee:"$500",
                regFee:"$700",
                downPayment:"$3000",
                tradeInPayment:"$8000",
                term:"60",
                creditTier:"1",
                apr:"",
                monthlyPayment:"$700",
                offeredPrice:"30000"
            }
          },
          {
            buyer:{
              fisrtName:"Wesley",
              lastName:"Pak",
              zip:"60006",
              phone:"7082345633",
              email:"wesley.pak@gmailTest.com"
            },
            vehicle:{
              make:"Subaru",
              model:"Outback",
              trim:"EXL",
              year:"2010",
              type:"Used",
              stockNo:"737243",
              imageUrl:"http://car-pictures.cars.com/images/?IMG=USC60ACS122A022002.jpg, http://images.cars.com/supersized/DMI/20/22138/05.jpg",
              vin:"DC0XPORUSAWREZBP8"
            },
            quote:{
              featPrice:"25000",
              taxRate:"5%",
              titleFee:"$500",
              regFee:"$700",
              downPayment:"$3000",
              tradeInPayment:"$0",
              term:"60",
              creditTier:"1",
              apr:"",
              monthlyPayment:"$400",
              offeredPrice:"23000"
            }
          }];

        angular.forEach($scope.proposals, function (value, key) {
          $scope.proposals[key].vehicle.imageUrl = value.vehicle.imageUrl.replace(/[\'\[\] ]/g, '').split(',');
        });
      }

      loadProposals();

      $scope.setSelectedProposal = function(selProposal) {
        proposal.selectedProposal(selProposal);
        $state.go("app.proposalDetail");
      };

      $scope.doRefresh = function() {
        loadVehicles();
        $scope.$broadcast('scroll.refreshComplete');
        $scope.$apply();
      };



    }]);

