'use strict';

angular.module('tasklists', ['ngRoute'], ['routeFilterProvider', 'securityProvider', function(routeFilterProvider, securityProvider) {

	routeFilterProvider.registerFilter('/tasklists:path?', {
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

	routeFilterProvider.when('/tasklists', {
		templateUrl: 'tasklists/tasklists.html',
		controller: 'tasklistsController'
	});

	routeFilterProvider.when('/tasklists/:id', {
		templateUrl: 'tasklists/tasks.html',
		controller: 'tasksController'
	});
}]);
