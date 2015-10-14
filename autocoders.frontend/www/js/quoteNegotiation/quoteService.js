var app = angular.module('starter');

app.factory('quoteService', ['$http', '$log', function ($http, $log) {
    var quoteFactory = {};
    var urlBaseTaxRate = 'https://taxrates.api.avalara.com/postal?country=usa';
    
    var apiKey = "FN8+sW0mxt8qKhlpfcLwX77qgbcxWTmU/oS3HPaw86yea5cRTV+cQge68UgQ46czU/QAjJwR8QRU8Oy6osB77w==";
    var taxRate = 9.25;
    var title = 150;
    var registrationFees = 25;
    
    quoteFactory.getRandomQuotePrice = function (msrp) {
        var num = parseFloat(msrp);
        var val = num - (num * Math.random());
        return {
            value: val
        };
    };

    quoteFactory.getTaxTitleReg = function (zipcode) {
        
        $http.get(urlBaseTaxRate + '?postal=' + zipcode + '&apikey=' + apiKey).
          success(function (data) {
              // alert(data.styles);
              //$scope.styles = data.styles;
              taxRate = data.totalRate;
          }).error(function (error) {
              taxRate = 9.25;
          });

        return {
            taxRate: taxRate,
            title: title,
            registrationFees: registrationFees
        };
    };
    
    quoteFactory.getMonthlyPayment = function (price, term, zipcode) {

        var taxes = quoteFactory.getTaxTitleReg(zipcode);
        var totalPrice = price + (price * taxes.taxRate) + taxes.registrationFees + taxes.title;
        var monthlyPayment = totalPrice / term;

        return monthlyPayment;

    };

    return quoteFactory;
}]);
