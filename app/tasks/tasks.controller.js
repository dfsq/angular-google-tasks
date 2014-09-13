(function() {
	'use strict';

	function tasksController($scope, $routeParams, tasks) {

		$scope.title = $routeParams.title;

		$scope.addTask = function() {

//			tasks.createTask($routeParams.id, {title: 'ONE MORE TEST'}).then(function() {
//				cache.clear('tasks' + $routeParams.id);
//				loadTasks();
//			});
		};

		function loadTasks() {
			tasks.getTasks($routeParams.id).then(function(data) {
				$scope.tasks = data;
			});
		}

		loadTasks();
	}

	tasksController.$inject = ['$scope', '$routeParams', 'tasks'];

	angular.module('tasks').controller('tasksController', tasksController);
})();