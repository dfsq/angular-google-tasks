(function() {
	'use strict';

	function tasklistsController($scope, tasks, sModal) {

		$scope.addNew = function() {
			var taskList = window.prompt('New task list');
			if (taskList) {
				tasks.createTaskList({title: taskList}).then(function() {
					loadTaskLists(true);
				});
			}
		};

		$scope.test = function() {
			var modalPromise = sModal.open({
				scope: $scope,
				controller: function($scope, $modalInstance) {
					$scope.save = function() {
						$modalInstance.close();
					};
				},
				template: 'modal-content.html'
			});

			modalPromise.then(function() {
				alert('ok!');
			}, function() {
				alert('canceled..');
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