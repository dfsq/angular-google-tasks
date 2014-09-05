(function() {
	'use strict';

	function login($routeProvider, securityProvider) {
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
				title: 'Sign In | ' + document.title,
				className: 'login-screen'
			}
		});
	}
	
	login.$inject = ['$routeProvider', 'securityProvider'];
	
	angular.module('login', ['ngRoute'], login);
})();