var app = angular.module('starter');

app.factory('jsonService', ['$log', function ($log) {
    
    var jsonService = {};

    jsonService.getObject = function(jsonString) {
        try {
            return JSON.parse(jsonString);

        } catch(e) {
            return jsonString;
        }

    };
}]);