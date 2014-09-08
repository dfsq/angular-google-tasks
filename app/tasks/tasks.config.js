(function() {
	'use strict';

	function tasks(routeFilterProvider) {
		routeFilterProvider.when('/tasklists/:title/:id', {
			templateUrl: 'tasks/tasks.html',
			controller: 'tasksController',
			page: {
				className: 'tasks-screen slide',
				title: 'Tasks | ' + document.title
			}
		});
	}

	tasks.$inject = ['routeFilterProvider'];

	angular.module('tasks', [], tasks);

})();