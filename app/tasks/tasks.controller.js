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
			.result.then(function() {
				loadTasks(true);
			});
		};

		$scope.deleteTask = function(taskId) {
			if (confirm('Task will be deleted. Ok?')) {
				tasks.deleteTask(tasklistId, taskId).then(function() {
					loadTasks(true);
				});
			}
		};

		$scope.changeStatus = function(task) {
			if (task.status === 'needsAction') {
				delete task.completed;
			}
			tasks.updateTask(tasklistId, task, { status: task.status });
		};

		function loadTasks(refresh) {
			tasks.getTasks(tasklistId, refresh).then(function(data) {
				$scope.tasks = data;
				$scope.total = data.total;
				$scope.completed = data.completed;
				$scope.todo = data.todo;
			});
		}

		loadTasks(false);
	}

	tasksController.$inject = ['$scope', '$routeParams', '$modal', 'tasks'];

	angular.module('tasks').controller('tasksController', tasksController);
})();