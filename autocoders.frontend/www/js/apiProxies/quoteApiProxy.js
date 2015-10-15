/**
 * Created by singhap on 10/14/15.
 */
angular.module('starter')
  .service('quoteApiProxy', function ($log, $http, logger,userApiProxy) {
    var self = this;
    var url = 'https://autocoders.azure-mobile.net/tables/quote';


    self.getQuotesforDealer = function () {
      logger.log('getting users');
      var filterUrl = url+"?$filter=(dealeraccesskey eq '"+userApiProxy.getCurrentUser().accountKey+"')";
      console.log(filterUrl);
      return $http.get(filterUrl);
    }

    self.addQuote = function (buyerQuote, sellerQuote, vehicle, buyer, dealerAccessKey) {
      var finalQuote = {};
      finalQuote.buyerquote = JSON.stringify(buyerQuote);
      finalQuote.sellerquote = JSON.stringify(sellerQuote);
      finalQuote.vehicle = JSON.stringify(vehicle);
      finalQuote.buyer = JSON.stringify(buyer);
      finalQuote.dealeraccesskey = dealerAccessKey;
      finalQuote.status = "Negotiating";
      logger.log('updating quote');
      return $http.post(url,finalQuote);
    }

    self.updateQuote = function (quote) {
      var finalQuote = {};
      finalQuote.id = quote.id;
      finalQuote.buyerquote = JSON.stringify(quote.buyerquote);
      finalQuote.sellerquote = JSON.stringify(quote.sellerquote);
      finalQuote.vehicle = JSON.stringify(quote.vehicle);
      finalQuote.buyer = JSON.stringify(quote.buyer);
      finalQuote.dealeraccesskey = quote.dealeraccesskey;
      finalQuote.status = quote.status;

      logger.log('updating quote');
      return $http.patch(url + "/" + quote.id,finalQuote);
    }

  });
