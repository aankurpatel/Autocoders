angular.module('starter')
.controller('quoteCtrl', function($scope, $stateParams) {
	$scope.view = {};
	$scope.vehicle = $stateParams.vehicle;
});