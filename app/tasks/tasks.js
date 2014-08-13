(function() {
	'use strict';
	
	function tasks(routeFilterProvider) {
		routeFilterProvider.when('/tasklists/:id', {
			templateUrl: 'tasks/tasks.html',
			controller: 'tasksController',
			page: {
				className: 'tasks-screen',
				title: 'Tasks | ' + document.title
			}
		});
	}
	
	tasks.$inject = ['routeFilterProvider'];

	angular.module('tasks', [], tasks);
	
})();