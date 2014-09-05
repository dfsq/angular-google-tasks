(function() {
	'use strict';

	function tasklists(routeFilterProvider, securityProvider) {
		routeFilterProvider.registerFilter('/tasklists:path?', {
			resolve: {
				auth: securityProvider.requestSignedIn
			},
			onRouteError: {
				redirectTo: '/login'
			}
		});

		routeFilterProvider.when('/tasklists', {
			templateUrl: 'tasklists/tasklists.html',
			controller: 'tasklistsController',
			page: {
				className: 'tasklists-screen slide',
				title: 'Task Lists | ' + document.title
			}
		});
	}

	tasklists.$inject = ['routeFilterProvider', 'securityProvider'];
	
	angular.module('tasklists', ['ngRoute'], tasklists);
})();