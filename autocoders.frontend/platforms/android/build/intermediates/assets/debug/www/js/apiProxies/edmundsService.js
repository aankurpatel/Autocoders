
var app = angular.module('starter');

app.factory('edmundsService',['$http','$log',function($http, $log)
{
		 var edmundsFactory = {};
		 var urlBaseVehicle = 'https://api.edmunds.com/api/vehicle/v2/';
		 var urlBaseTCO = 'https://api.edmunds.com/v1/api/tco/';
		 var apiKey = "5mb6ytkzebykvr6978nwt37q";

    edmundsFactory.getAllMakes = function() {
        return $http.get(urlBaseVehicle + 'makes?fmt=json&api_key=' + apiKey);
    };

    edmundsFactory.getAllModels = function(make) {
        return $http.get(urlBaseVehicle + make + '/models?fmt=json&api_key=' + apiKey);
    };

    edmundsFactory.decodeVin = function(vin) {
        //var deferred = $q.defer();
        return $http.get(urlBaseVehicle + 'vins/' + vin + '?fmt=json&api_key=' + apiKey);
    };

    edmundsFactory.getAllStyles = function(make, model, year) {
        return $http.get(urlBaseVehicle + make + '/' + model + '/' + year + '/styles?fmt=json&api_key=' + apiKey);
    };
    
    edmundsFactory.getTCO = function (styleId, zipcode) {
        return $http.get(urlBaseTCO + '/usedtotalcashpricebystyleidandzip/' + styleId + '/' + zipcode + '?fmt=json&api_key=' + apiKey);
    };
    
    edmundsFactory.getRebatesIncentives = function (styleId, zipcode) {
        return $http.get('https://api.edmunds.com/v1/api/incentive/incentiverepository/findincentivesbystyleidandzipcode?styleId=' + styleId + '&zipcode=' + zipcode + '&fmt=json&api_key=' + apiKey);
    };

    return edmundsFactory;
}]);
