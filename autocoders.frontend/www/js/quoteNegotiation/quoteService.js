var app = angular.module('starter');

app.factory('quoteService', ['$http', '$log', '$q', function ($http, $log, $q) {
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

    quoteFactory.getTaxTitleReg = function(zipcode) {
        var deferred = $q.defer();
        $http.get(urlBaseTaxRate + '?postal=' + zipcode + '&apikey=' + apiKey).
            success(function(data) {
                taxRate = data.totalRate;
                deferred.resolve({                    
                    taxRate: taxRate,
                    title: title,
                    registrationFees: registrationFees
                });
            }).error(function(error) {
                deferred.reject({ taxRate: 9.25 });
            });

        return deferred.promise;
    };

 
    quoteFactory.getQuote = function(price, term, zipcode) {
        var defer = $q.defer();
        quoteFactory.getTaxTitleReg(zipcode).then(function(taxes) {
            var totalPrice = price + (price * taxes.taxRate) + taxes.registrationFees + taxes.title;
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
