(function() {
	'use strict';

	function tasklistsController($scope, tasks, sModal) {

		function loadTaskLists(refresh) {
			tasks.getTaskLists(refresh).then(function(data) {
				$scope.taskLists = data;
			});
		}

		function reloadList() {
			loadTaskLists(true);
		}
		
		$scope.addNew = function() {
			sModal.open({
				scope: $scope,
				templateUrl: 'tasklists/addTasklist.html'
			}).then(function(taskList) {
				if (taskList) {
					tasks.createTaskList({title: taskList}).then(reloadList);
				}
			});
		};

		$scope.delete = function(tasklistId) {
			sModal.open({
				scope: $scope,
				controller: ['$scope', function($scope) {
					$scope.message = 'Tasklist will be deleted with all tasks in it. Proceed?';
				}],
				templateUrl: 'components/templates/confirm.html'
			}).then(function() {
				tasks.deleteTaskList(tasklistId).then(reloadList);
			});
		};

		$scope.refresh = reloadList;

		$scope.rename = function(taskList) {
			sModal.open({
				scope: $scope,
				controller: ['$scope', function($scope) {
					$scope.name = taskList.title;
				}],
				templateUrl: 'tasklists/addTasklist.html'
			}).then(function(newTitle) {
				if (newTitle) {
					tasks.updateTaskList(taskList, {title: newTitle}).then(reloadList);
				}
			});
		};

		loadTaskLists(false);
	}

	tasklistsController.$inject = ['$scope', 'tasks', 'sModal'];

	angular.module('tasklists').controller('tasklistsController', tasklistsController);
})();