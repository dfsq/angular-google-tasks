(function() {
	'use strict';

	function tasksController($scope, $routeParams, sModal, tasks) {

		var tasklistId = $routeParams.id;

		$scope.title = $routeParams.title;

		$scope.addTask = function() {
			sModal.open({
				controller: 'addTaskController',
				templateUrl: 'tasks/addTask.html',
				scope: $scope
			}).then(function() {
				loadTasks(true);
			});
		};

		$scope.deleteTask = function(taskId) {
			sModal.open({
				scope: $scope,
				controller: ['$scope', function($scope) {
					$scope.message = 'Task will be deleted forever. Ok?';
				}],
				templateUrl: 'components/templates/confirm.html'
			}).then(function() {
				tasks.deleteTask(tasklistId, taskId).then(function() {
					loadTasks(true);
				});
			});
		};

		$scope.pinTask = function() {
			window.alert('pin: no idea yet');
		};

		$scope.changeStatus = function(task) {
			if (task.status === 'needsAction') {
				delete task.completed;
			}
			tasks.updateTask(tasklistId, task, { status: task.status }).then(function() {
                loadTasks(true);
            });
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

	tasksController.$inject = ['$scope', '$routeParams', 'sModal', 'tasks'];

	angular.module('tasks').controller('tasksController', tasksController);
})();
