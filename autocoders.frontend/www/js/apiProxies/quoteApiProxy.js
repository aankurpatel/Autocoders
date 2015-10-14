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

    self.addUpdateQuote = function (quote) {
      logger.log('updating quote');
      return $http.post(url,quote);
    }

  });
