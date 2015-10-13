angular.module('starter')
.controller('quoteCtrl', [ '$scope','$stateParams','quoteService',
	function($scope, $stateParams, quoteService) {
		$scope.vehicle = $stateParams.vehicle;
		$scope.Error = "";
		$scope.monthlyPayment = 0;
		$scope.taxRate = 0;
		$scope.titlePrice = 0;
		$scope.registrationFees = 0;
		//Init
		(function(){
			quoteService.getQuote($scope.vehicle.featPrice, $scope.zipCode).then(
				function(payment){
					$scope.monthlyPayment = payment.value;
					$scope.taxRate = payment.taxRate;
					$scope.titlePrice = payment.titlePrice;
					$scope.registrationFees = payment.registrationFees;
				},
				function(){
					$scope.Error = "Error fetching quote. Please retry.";
				}
			);
		})();
	}]);