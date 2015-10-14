angular.module('starter')
.controller('quoteCtrl', [ '$scope','$stateParams','quoteService',
	function($scope, $stateParams, quoteService) {
		$scope.view = {};
		$scope.vehicle = $stateParams.vehicle;
		$scope.Error = "";
		$scope.monthlyPayment = 0;
		$scope.taxRate = 0;
		$scope.titlePrice = 0;
		$scope.registrationFees = 0;
		$scope.term = 60;
		$scope.zipCode = '60107';
		$scope.tradeInValue = 0;
		$scope.downPayment = 0;
		
		$scope.sellerQuote = {};
		$scope.buyerQuote = {};
	    
		$scope.AcceptQuote = function(){
			$scope.view.editable = false;
		};
		
		$scope.Negotiate = function(){
			$scope.view.editable = true;	
		};
		
		//Init
		(function(){
			quoteService.getQuote($scope.vehicle.featPrice, $scope.tradeInValue, $scope.downPayment, $scope.term, $scope.zipCode).then(
				function(payment){
					$scope.monthlyPayment = payment.value;
					$scope.taxRate = payment.taxRate;
					$scope.titlePrice = payment.titlePrice;
					$scope.registrationFees = payment.registrationFees;
					$scope.view.editable = false;
				},
				function(){
					$scope.Error = "Error fetching quote. Please retry.";
				}
			);
		})();
	}]);