var app = angular.module('starter');

app.factory('quoteService', ['$http', '$log', '$q', function ($http, $log, $q) {
    var quoteFactory = {};
    var urlBaseTaxRate = 'https://taxrates.api.avalara.com/postal?country=usa';
    
    var apiKey = "FN8+sW0mxt8qKhlpfcLwX77qgbcxWTmU/oS3HPaw86yea5cRTV+cQge68UgQ46czU/QAjJwR8QRU8Oy6osB77w==";
    var taxRate = 9.25;
    var title = 150;
    var registrationFees = 25;
    
    quoteFactory.getQuote = function (msrp, zipcode) {
        var deferred = $q.defer();
        var num = parseFloat(msrp);
        var val = num - (num * Math.random());
        zipcode = "60169";
        $http.get(urlBaseTaxRate + '&postal=' + zipcode + '&apikey=' + apiKey).
            success(function(data) {
                // alert(data.styles);
                //$scope.styles = data.styles;
                taxRate = data.totalRate;
                deferred.resolve({
                    value: val,
                    taxRate: taxRate,
                    title: title,
                    registrationFees: registrationFees
                });
            }).error(function(error) {
                deferred.reject({taxRate: 9.25});
            });
        return deferred.promise;
    };


    //quoteFactory.getRebatesIncentives = function (styleId, zipcode) {
    //    return $http.get('https://api.edmunds.com/v1/api/incentive/incentiverepository/findincentivesbystyleidandzipcode?styleId=' + styleId + '&zipcode=' + zipcode + '&fmt=json&api_key=' + apiKey);
    //};

    return quoteFactory;
}]);
