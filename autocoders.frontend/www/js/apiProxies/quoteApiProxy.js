/**
 * Created by singhap on 10/14/15.
 */
angular.module('starter')
  .service('quoteApiProxy', function ($log, $http, logger,userApiProxy) {
    var self = this;
    var url = 'https://autocoders.azure-mobile.net/tables/quote';


    self.getQuotesforDealer = function () {
      logger.log('getting users');
      var filterUrl = url+"?$filter=(dealeraccesskey eq '"+userApiProxy.getCurrentUser().accountKey+"'and status eq 'Negotiating')";
      console.log(filterUrl);
      return $http.get(filterUrl);
    }

    self.addQuote = function (buyerQuote, sellerQuote, vehicle, buyer, dealerAccessKey) {
      var finalQuote = {};
      finalQuote.buyerQuote = JSON.stringify(buyerQuote);
      finalQuote.sellerQuote = JSON.stringify(sellerQuote);
      finalQuote.vehicle = JSON.stringify(vehicle);
      finalQuote.buyer = JSON.stringify(buyer);
      finalQuote.dealerAccessKey = dealerAccessKey;
      finalQuote.status = "Negotiating";
      logger.log('updating quote');
      return $http.post(url,finalQuote);
    }

    self.updateQuote = function (quote) {
      var finalQuote = {};
      finalQuote.id = quoteId;
      finalQuote.buyerQuote = JSON.stringify(buyerQuote);
      finalQuote.sellerQuote = JSON.stringify(sellerQuote);
      finalQuote.vehicle = JSON.stringify(vehicle);
      finalQuote.buyer = JSON.stringify(buyer);
      finalQuote.dealerAccessKey = dealerAccessKey;
      finalQuote.status = "Negotiating";
      logger.log('updating quote');
      return $http.patch(url + "/" + quote.id,finalQuote);
    }

  });
