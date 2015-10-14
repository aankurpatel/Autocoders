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

    self.addUpdateQuote = function (quoteId, buyerQuote, sellerQuote, vehicle, buyerAccessKey, dealerAccessKey) {
      var finalQuote = {};
      if(!quoteId === 0){
        finalQuote.id = quoteId;
      }
      finalQuote.buyerQuote = JSON.stringify(buyerQuote);
      finalQuote.sellerQuote = JSON.stringify(sellerQuote);
      finalQuote.vehicle = JSON.stringify(vehicle);
      finalQuote.buyerAccessKey = buyerAccessKey;
      finalQuote.dealerAccessKey = dealerAccessKey;
      
      logger.log('updating quote');
      return $http.post(url,finalQuote);
    }

  });
