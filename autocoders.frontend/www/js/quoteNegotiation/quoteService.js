var app = angular.module('starter');

app.factory('quoteService', ['$http', '$log', '$q', function($http, $log, $q) {
    var quoteFactory = {};
    var urlBaseTaxRate = 'https://taxrates.api.avalara.com/postal?country=usa';

    var apiKey = "FN8%2BsW0mxt8qKhlpfcLwX77qgbcxWTmU%2FoS3HPaw86yea5cRTV%2BcQge68UgQ46czU%2FQAjJwR8QRU8Oy6osB77w%3D%3D";
    var taxRate = 9.25;
    var title = 150;
    var registrationFees = 25;

    quoteFactory.getRandomQuotePrice = function(msrp) {
        var num = parseFloat(msrp);
        var val = num - (num * Math.random());
        return {
            value: val
        };
    };

    quoteFactory.getTaxTitleReg = function(zipcode) {
        var deferred = $q.defer();
        $http.get(urlBaseTaxRate + '&postal=' + zipcode + '&apikey=' + apiKey).
            success(function(data) {
                taxRate = data.totalRate;
                deferred.resolve({
                    taxRate: taxRate,
                    title: title,
                    registrationFees: registrationFees
                });
            }).error(function(error) {
                deferred.resolve({ taxRate: 9.25,
                    title: title,
                    registrationFees: registrationFees         
                });
            });

        return deferred.promise;
    };

    quoteFactory.getQuote = function(price, term, tradeinValue, downpayment, zipcode) {
        var defer = $q.defer();
        quoteFactory.getTaxTitleReg(zipcode).then(function(taxes) {
            var netPrice = price - tradeinValue - downpayment;
            var totalPrice = netPrice + (netPrice * (taxes.taxRate/100)) + taxes.registrationFees + taxes.title;
            var monthlyPayment = totalPrice / term;
            defer.resolve({
                monthlyPayment: monthlyPayment,
                taxRate: taxes.taxRate,
                registrationFee: taxes.registrationFees,
                titleFee: taxes.title
            });
        });
        return defer.promise;
    };

    return quoteFactory;
}]);
