/**
 * Created by vamshi on 10/13/15.
 */
angular.module('starter')
.controller('quoteCtrl', [ '$scope','$stateParams','quoteService', 'quoteApiProxy', 'userApiProxy','pushNotificationService', '$state','$ionicModal','$cordovaBarcodeScanner',
    'edmundsService',
    '$cordovaToast','photoService','$cordovaImagePicker','$cordovaCamera',
	function($scope, $stateParams, quoteService, quoteApiProxy, userApiProxy, pushNotificationService, $state,$ionicModal,$cordovaBarcodeScanner,edmundsService,
           $cordovaToast,photoService,$cordovaImagePicker,$cordovaCamera) {
		$scope.view = {};
		$scope.view.showAccept = true;
		$scope.view.showMakeOffer = true;
		$scope.creditTiers = ["700+", "660-699", "620-659", "600-619"];
		$scope.sellerQuote = {};
		$scope.hideNegotiations = false;
		$scope.buyerQuoteOffer = {};
		var self = this;

		self.setPaymentOnQuote = function(quote, paymentInfo){
			quote.featPrice = $scope.vehicle.featPrice;
			quote.titleFee =  paymentInfo.titleFee;
			quote.regFee = paymentInfo.registrationFee;
			quote.term = 60;
			quote.creditTier = quote.creditTier;
			quote.apr = 1.99;
			quote.taxRate = paymentInfo.taxRate;
			quote.monthlyPayment = paymentInfo.monthlyPayment;
		};

		self.AddQuote = function(status){
			quoteApiProxy.addQuote($scope.buyerQuoteOffer, $scope.sellerQuote, $scope.vehicle, $scope.buyer, $scope.vehicle.accountKey)
				.then(function (finalQuote) {
				    var statusMessage = (status === "BuyerAccepted" ? "accepted" : "generated");
					$scope.finalQuote = finalQuote.data;
					$scope.view.editable = false;
					var message ={
						title:"Message from Autocoders",
						message:"Hello! A proposal has been "+ statusMessage +" by " + $scope.buyer.name + " for "
						+$scope.vehicle.year+" " +$scope.vehicle.make+" " +$scope.vehicle.model+" "
						+$scope.vehicle.trim + ".",
						quoteId:$scope.finalQuote.id,
						type:"Negotiating",
						route:"app.proposalDetail",
						data:{proposal:$scope.finalQuote}
					};
					pushNotificationService.sendNotification($scope.vehicle.accountKey,message);
					$state.go("app.quoteSubmitted");
				});
		};

		$scope.AcceptQuote = function(){
			$scope.sellerQuote.offerPrice = $scope.buyerQuoteOffer.offerPrice;
			$scope.buyerQuoteOffer = $scope.sellerQuote;
			self.AddQuote("BuyerAccepted");
		};

		$scope.CalcPayment = function(){
			//Request payments
			quoteService.getQuote($scope.buyerQuoteOffer.offerPrice, $scope.buyerQuoteOffer.term, $scope.buyerQuoteOffer.tradeInValue, $scope.buyerQuoteOffer.downPayment, $scope.zipCode).then(
				function(payment){
					self.setPaymentOnQuote($scope.buyerQuoteOffer, payment);
				},
				function(){
					$scope.Error = "Error fetching quote. Please retry.";
				}
			);
		};

		self.buildQuote = function(){
			var finalQuote = {};
			finalQuote.id = $scope.finalQuote.id;
			finalQuote.buyerquote = JSON.stringify($scope.buyerQuoteOffer);
			finalQuote.sellerquote = JSON.stringify($scope.sellerQuote);
			finalQuote.vehicle = JSON.stringify($scope.vehicle);
			finalQuote.buyer = JSON.stringify($scope.buyer);
			finalQuote.dealeraccesskey = $scope.vehicle.accountKey;
			finalQuote.status = "Negotiating";
			return finalQuote;
		};

    $ionicModal.fromTemplateUrl('js/addEditVehicle/addEditVehicle.html', {
      scope: $scope
    }).then(function (modal) {
      $scope.tradeInModal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeTradeInModal = function () {
      $scope.tradeInModal.hide();
    };

    // Open the login modal
    $scope.scanVin = function () {
      $scope.tradeInModal.show();
    };
    $scope.tradein={};

    $scope.startScan = function() {
      $cordovaBarcodeScanner.scan()
        .then(function(result) {
          var s = "Result: " + result.text + "<br/>" +
            "Format: " + result.format + "<br/>" +
            "Cancelled: " + result.cancelled;
          $scope.tradein.vin = result.text;

          edmundsService.decodeVin(result.text).then(function(result){


            $scope.tradein.make = "Honda";
            $scope.tradein.model = "Accord";
            $scope.tradein.style =  "4 door SUV";
            $scope.tradein.year = "2010";
          });



        },
        function(error) {
          //alert("Scanning failed: " + error);
        }
      );
    };
    $scope.allImages = [];
    $scope.getPhoto = function(args) {
      document.addEventListener("deviceready", function () {
        $cordovaCamera.getPicture(photoService.captureImageOptions()).then(function (image) {
          //var base64Image = photoService.getBase64Image(image);
          $scope.allImages.push(image);
        }, function (err) {
          //alert(err);
        });

      }, false);
    };

    //$scope.scanVin = function(){
    //  $state.go('app.addEditVehicle');
    //}

		$scope.MakeOffer = function () {
		   // alert('accountKey:' + $scope.vehicle.accountKey + 'userKey:' + $scope.buyer.accountKey);
			//Submit Offer
			if($scope.view.offerStatus === "SUBMIT OFFER"){
				//Insert if id is null/undefined, else, update the finalQuote
				$scope.sellerQuote.offerPrice = $scope.buyerQuoteOffer.offerPrice;
				if($scope.finalQuote && $scope.finalQuote.id){
					$scope.finalQuote = self.buildQuote();
					quoteApiProxy.updateQuote($scope.finalQuote)
						.then(function(finalQuote){
							$scope.finalQuote = finalQuote.data;
							var message ={
								title:"Message from Autocoders",
								message:"Hello! A proposal has been generated by " + $scope.buyer.name +" for "
								+$scope.vehicle.year+" " +$scope.vehicle.make+" " +$scope.vehicle.model+" "
								+$scope.vehicle.trim + ".",
								quoteId:$scope.finalQuote.id,
								type:"Negotiating",
								route:"app.proposalDetail",
								data:{proposal:$scope.finalQuote}
							};
							pushNotificationService.sendNotification($scope.vehicle.accountKey,message);
							$state.go("app.quoteSubmitted");
						});
				}else{
					self.AddQuote();
				}
				$scope.view.offerStatus = "MAKE OFFER";
			}else{//MAKE OFFER
				$scope.view.editable = true;
				$scope.view.showAccept = false;
				$scope.buyerQuoteOffer = angular.copy($scope.sellerQuote);//Make a deep copy of sellerQuote first time
				$scope.view.quote = $scope.buyerQuoteOffer;
				$scope.view.offerStatus = "SUBMIT OFFER";
			}
		};


		self.openSellerQuote = function () {
		    var quote = $stateParams.quote;
		    $scope.buyerQuoteOffer = JSON.parse(JSON.stringify(quote.buyerquote));
		    $scope.sellerQuote = JSON.parse(JSON.stringify(quote.sellerquote));
		    $scope.vehicle  = JSON.parse(JSON.stringify(quote.vehicle));
		    $scope.buyer  = JSON.parse(JSON.stringify(quote.buyer));
			$scope.status = quote.status;
			$scope.view.editable = true;
			$scope.view.quote = $scope.sellerQuote;
			$scope.buyerQuoteOffer.offerPrice = $scope.sellerQuote.offerPrice;
			if($scope.status === "Accepted"){
				$scope.view.showAccept = false;
				$scope.view.showMakeOffer = false;
				$scope.view.editable = true;
			}else if($scope.status === "Negotiating"){
				$scope.view.showAccept = true;
				$scope.view.showMakeOffer = true;
				$scope.view.editable = true;
			}
		};


		//Init
	    (function () {
			$scope.view.offerStatus = "MAKE OFFER";
			//State checks
			if($stateParams.vehicle){
			    $scope.vehicle = $stateParams.vehicle;
			}else{
			    self.openSellerQuote();
			    return;
			}

			//Set Defaults
			$scope.sellerQuote.term = 60;
			$scope.sellerQuote.creditTier = "700+";
			$scope.sellerQuote.tradeInValue = 0;
			$scope.sellerQuote.downPayment = 0;
			$scope.buyerQuoteOffer.offerPrice = $scope.vehicle.featPrice;
			$scope.buyerQuoteOffer.tradeInValue = 0;
			$scope.buyerQuoteOffer.downPayment = 0;
			$scope.buyerQuoteOffer.creditTier = "700+";
			if(!$scope.zipCode){
				$scope.zipCode = '60107';
			}
			userApiProxy.getUsers("(accountKey eq '"+ userApiProxy.getCurrentUser().accountKey + "')").then(function(user){
				$scope.buyer = user.data[0];
			});

			//Request payments
			quoteService.getQuote($scope.vehicle.featPrice, $scope.sellerQuote.term, $scope.sellerQuote.tradeInValue, $scope.sellerQuote.downPayment, $scope.zipCode).then(
				function(payment){
					$scope.view.editable = false;
					$scope.view.offerStatus = "MAKE OFFER";
					self.setPaymentOnQuote($scope.sellerQuote, payment);
					$scope.view.quote = $scope.sellerQuote;
				},
				function(){
					$scope.Error = "Error fetching quote. Please retry.";
				}
			);
		})();
	}]);
