angular.module('starter')
.controller('quoteCtrl', [ '$scope','$stateParams','quoteService', 'quoteApiProxy', 'userApiProxy',
	function($scope, $stateParams, quoteService, quoteApiProxy, userApiProxy) {
		$scope.view = {};
		$scope.vehicle = $stateParams.vehicle;
		$scope.creditTiers = ["700+", "660-699", "620-659", "600-619"];
		$scope.sellerQuote = {};
		$scope.buyerQuoteOffer = {};
		var self = this;
	    var buyerAccessKey = userApiProxy.getCurrentUser().accountKey;
		$scope.AcceptQuote = function(){
			$scope.view.editable = false;
		};
		
		$scope.Negotiate = function(){
			$scope.view.editable = true;
			$scope.buyerQuoteOffer = angular.copy($scope.sellerQuote);//Make a deep copy of sellerQuote first time
		};
		
		self.setPaymentOnQuote = function(quote, paymentInfo){
			quote.featPrice = $scope.vehicle.featPrice;
			quote.titleFee =  paymentInfo.titleFee;
			quote.regFee = paymentInfo.registrationFees;
			quote.term = 60;
			quote.creditTier = quote.creditTier;
			quote.apr = 1.99;
			quote.taxRate = paymentInfo.taxRate;
			quote.monthlyPayment = paymentInfo.monthlyPayment;
		};
		
		self.AddCurrentQuote = function(){
			quoteApiProxy.addUpdateQuote(0, $scope.buyerQuoteOffer, $scope.sellerQuote, $scope.vehicle, buyerAccessKey, $scope.vehicle.accountKey)
				.then(function(finalQuote){
					$scope.finalQuote = finalQuote;
				});
		};
		
		//Init
		(function(){
			//Set Defaults
			$scope.sellerQuote.term = 60;
			$scope.sellerQuote.tradeInValue = 0;
			$scope.sellerQuote.downPayment = 0;
			if(!$scope.zipCode){
				$scope.zipCode = '60107';
			}
			//Request payments
			quoteService.getQuote($scope.vehicle.featPrice, $scope.sellerQuote.term, $scope.sellerQuote.tradeInValue, $scope.sellerQuote.downPayment, $scope.zipCode).then(
				function(payment){
					$scope.view.editable = false;
					self.setPaymentOnQuote($scope.sellerQuote, payment);
					self.AddCurrentQuote();
				},
				function(){
					$scope.Error = "Error fetching quote. Please retry.";
				}
			);
		})();
	}]);