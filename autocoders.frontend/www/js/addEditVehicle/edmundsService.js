use 'strict';

angular.module('starter').factory('edmundsService', ['$http', '$q',  
	function ($http, $q) {
		 var apiKey = "5mb6ytkzebykvr6978nwt37q";
    	return {    		
		        decodeVin: function (vin) {
		            var deferred = $q.defer();
		            $http.get(webAPIRelativePath + "https://api.edmunds.com/api/vehicle/v2/vins/" + caryear + "/" + oldalgcode + "/" + newalgcode).
		                success(function (data) {
		                    deferred.resolve(data);
		                }).
		                error(function (data, status) {
		                    deferred.reject(data);
		                    throw new ApiException(data, status);
		                });

		            return deferred.promise;
		        }
    };
}]);
