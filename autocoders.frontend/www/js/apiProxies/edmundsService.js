use 'strict';

var app = angular.module('starter');

app.factory('edmundsService',['$http','$log',function($http, $log)
{
		 var edmundsFactory = {};
  		 var urlBase = 'https://api.edmunds.com/api/vehicle/v2/';
		 var apiKey = "5mb6ytkzebykvr6978nwt37q";

		edmundsFactory.getAllMakes = function() {
		    return $http.get(urlBase + 'makes?fmt=json&api_key=' + apiKey);
		  };
		  
		  edmundsFactory.getAllModels = function(make) {
		      return $http.get(urlBase + make + '/models?fmt=json&api_key=' + apiKey);
		  };

		  edmundsFactory.decodeVin = function (vin) {
		            //var deferred = $q.defer();
		      return $http.get(urlBase + 'vins/' + vin + '?fmt=json&api_key=' + apiKey);

		               /*.success(function (data) {
		                    deferred.resolve(data);
		                }).
		                error(function (data, status) {
		                    deferred.reject(data);
		                    throw new ApiException(data, status);
		                });

		            return deferred.promise;*/
		        };
		  
		  edmundsFactory.getAllStyles = function (make, model, year) {
		      return $http.get(urlBase + make + '/' + model + '/' + year + '/styles?fmt=json&api_key=' + apiKey);
		  };
    
		  return edmundsFactory;
}]);
