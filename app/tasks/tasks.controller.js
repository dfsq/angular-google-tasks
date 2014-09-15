(function() {
	'use strict';

	function tasksController($scope, $routeParams, $modal, tasks) {

		var takslistId = $routeParams.id;

		$scope.title = $routeParams.title;

		$scope.addTask = function() {
			$modal.open({
				controller: 'addTaskController',
				templateUrl: 'tasks/addTask.html',
				scope: $scope,
				size: 'sm'
			})
			.result.then(loadTasks);
		};

		$scope.deleteTask = function(taskId) {
			if (confirm('Task will be deleted. Ok?')) {
				tasks.deleteTask(takslistId, taskId).then(loadTasks);
			}
		};

		function loadTasks() {
			tasks.getTasks(takslistId, true).then(function(data) {
				$scope.tasks = data;
			});
		}

		loadTasks();
	}

	tasksController.$inject = ['$scope', '$routeParams', '$modal', 'tasks'];

	angular.module('tasks').controller('tasksController', tasksController);
})();