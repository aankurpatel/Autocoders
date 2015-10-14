angular.module('starter')
.controller('quoteCtrl', [ '$scope','$stateParams','quoteService', 'quoteApiProxy', 'userApiProxy',
	function($scope, $stateParams, quoteService, quoteApiProxy, userApiProxy) {
		$scope.view = {};
		$scope.vehicle = $stateParams.vehicle;
		$scope.creditTiers = ["700+", "660-699", "620-659", "600-619"];
		$scope.sellerQuote = {};
		$scope.buyerQuoteOffer = {};
		var self = this;
	    var buyer = userApiProxy.getCurrentUser();
		$scope.AcceptQuote = function(){
			$scope.view.editable = false;
		};
		
		$scope.Negotiate = function(){
			$scope.view.editable = true;
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
			$scope.view.quote = $scope.sellerQuote;
		};
		
		$scope.AcceptQuote = function(){
			quoteApiProxy.addQuote($scope.buyerQuoteOffer, $scope.sellerQuote, $scope.vehicle, buyer, $scope.vehicle.accountKey)
				.then(function(finalQuote){
					$scope.finalQuote = finalQuote.data;
				});
		};
		
		$scope.MakeOffer = function() {
			$scope.view.editable = true;
			$scope.buyerQuoteOffer = angular.copy($scope.sellerQuote);//Make a deep copy of sellerQuote first time
			$scope.view.quote = $scope.buyerQuoteOffer;
			//Submit Offer
			if($scope.view.offerStatus = "SUBMIT OFFER"){
				//Insert if id is null/undefined, else, update the finalQuote
				if($scope.finalQuote && $scope.finalQuote.id){
					quoteApiProxy.updateQuote($scope.finalQuote.id, $scope.buyerQuoteOffer, $scope.sellerQuote, $scope.vehicle, buyer, $scope.vehicle.accountKey)
						.then(function(finalQuote){
							$scope.finalQuote = finalQuote.data;
							$scope.view.offerStatus = "MAKE OFFER";
							//Switch view quote back to initial Quote	
							$scope.view.quote = $scope.sellerQuote;
						});	
				}else{
					$scope.AcceptQuote();
				}
			}
			$scope.view.offerStatus = "SUBMIT OFFER";
		};
		
		//Init
		(function(){
			//Set Defaults
			$scope.sellerQuote.term = 60;
			$scope.sellerQuote.creditTier = "700+";
			$scope.sellerQuote.tradeInValue = 0;
			$scope.sellerQuote.downPayment = 0;
			if(!$scope.zipCode){
				$scope.zipCode = '60107';
			}
			//Request payments
			quoteService.getQuote($scope.vehicle.featPrice, $scope.sellerQuote.term, $scope.sellerQuote.tradeInValue, $scope.sellerQuote.downPayment, $scope.zipCode).then(
				function(payment){
					$scope.view.editable = false;
					$scope.view.offerStatus = "MAKE OFFER";
					self.setPaymentOnQuote($scope.sellerQuote, payment);
				},
				function(){
					$scope.Error = "Error fetching quote. Please retry.";
				}
			);
		})();
	}]);