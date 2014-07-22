'use strict';

angular.module('login', ['ngRoute'], ['$routeProvider', function($routeProvider) {
	$routeProvider.when('/login', {
		templateUrl: 'login/login.html',
		controller: 'loginController'
	});
}]);