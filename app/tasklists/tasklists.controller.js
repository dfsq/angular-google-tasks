(function() {
	'use strict';

	function tasklistsController($scope, tasks, sModal) {

		$scope.addNew = function() {

			sModal.open({
				scope: $scope,
				templateUrl: 'tasklists/addTasklist.html'
			}).then(function(taskList) {
				if (taskList) {
					tasks.createTaskList({title: taskList}).then(function() {
						loadTaskLists(true);
					});
				}
			});
		};

		$scope.delete = function(tasklistId) {
			tasks.deleteTaskList(tasklistId).then(function() {
				loadTaskLists(true);
			});
		};

		function loadTaskLists(refresh) {
			tasks.getTaskLists(refresh).then(function(data) {
				$scope.taskLists = data;
			});
		}

		loadTaskLists(false);
	}

	tasklistsController.$inject = ['$scope', 'tasks', 'sModal'];

	angular.module('tasklists').controller('tasklistsController', tasklistsController);
})();