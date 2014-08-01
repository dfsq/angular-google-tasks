'use strict';

angular.module('tasklists', ['ngRoute'], ['$routeProvider', 'securityProvider', function($routeProvider, securityProvider) {
	$routeProvider.when('/tasklists', {
		templateUrl: 'tasklists/tasklists.html',
		controller: 'tasklistsController',
		resolve: {
			auth: securityProvider.requestSignedIn
		},
		onRouteError: {
			redirectTo: '/login'
		},
		page: {
			className: 'tasklists-screen',
			title: document.title + ' | Task Lists'
		}
	});
}]);
