'use strict';

angular.module('login', ['ngRoute'], ['$routeProvider', 'securityProvider', function($routeProvider, securityProvider) {
	$routeProvider.when('/login', {
		templateUrl: 'login/login.html',
		controller: 'loginController',
		resolve: {
			auth: securityProvider.requestGuest
		},
		onRouteError: {
			redirectTo: '/tasklists'
		},
		page: {
			title: document.title + ' | Sign In',
			className: 'login-screen'
		}
	});
}]);