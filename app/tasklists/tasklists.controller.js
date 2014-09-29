(function() {
	'use strict';

	function tasklistsController($scope, tasks) {

		$scope.addNew = function() {
			var taskList = prompt('New task list');
			tasks.createTaskList({title: taskList}).then(function() {
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

	tasklistsController.$inject = ['$scope', 'tasks'];

	angular.module('tasklists').controller('tasklistsController', tasklistsController);
})();