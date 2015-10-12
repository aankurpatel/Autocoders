use 'strict';

angular.module('starter').factory('edmundsService', ['$http', '$log',  
	function ($http, $log) {
		 var edmundsFactory = {};
  		 var urlBase = 'https://api.edmunds.com/api/vehicle/v2/';
		 var apiKey = "5mb6ytkzebykvr6978nwt37q";

		edmundsFactory.getAllMakes = function(){
    
		    return $http.get(urlBase + 'makes?fmt=json&api_key=5mb6ytkzebykvr6978nwt37q')
		  };
		  
		  edmundsFactory.getAllModels = function(make){
		    return $http.get(urlBase + make + '/models?fmt=json&api_key=5mb6ytkzebykvr6978nwt37q')
		  };

		  /*edmundsFactory.decodeVin: function (vin) {
		            var deferred = $q.defer();
		            $http.get(webAPIRelativePath + "urlBase + "vins/" + caryear + "/" + oldalgcode + "/" + newalgcode).
		                success(function (data) {
		                    deferred.resolve(data);
		                }).
		                error(function (data, status) {
		                    deferred.reject(data);
		                    throw new ApiException(data, status);
		                });

		            return deferred.promise;
		        }*/
		  
		  return edmundsFactory;
    	
    };
}]);
