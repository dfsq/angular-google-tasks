(function() {
	'use strict';

	function tasksController($scope, $routeParams, $modal, tasks) {

		var tasklistId = $routeParams.id;

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
				tasks.deleteTask(tasklistId, taskId).then(loadTasks);
			}
		};

		$scope.changeStatus = function(task) {
			tasks.updateTask(tasklistId, task, { status: task.status });
		};

		function loadTasks() {
			tasks.getTasks(tasklistId, true).then(function(data) {
				$scope.tasks = data;
			});
		}

		loadTasks();
	}

	tasksController.$inject = ['$scope', '$routeParams', '$modal', 'tasks'];

	angular.module('tasks').controller('tasksController', tasksController);
})();