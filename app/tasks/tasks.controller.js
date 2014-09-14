(function() {
	'use strict';

	function tasksController($scope, $routeParams, $modal, tasks) {

		$scope.title = $routeParams.title;

		$scope.addTask = function() {
			$modal.open({
				controller: 'addTaskController',
				templateUrl: 'tasks/addTask.html',
				scope: $scope,
				size: 'sm'
			}).result.then(function() {
				loadTasks();
			});
		};

		function loadTasks() {
			tasks.getTasks($routeParams.id, true).then(function(data) {
				$scope.tasks = data;
			});
		}

		loadTasks();
	}

	tasksController.$inject = ['$scope', '$routeParams', '$modal', 'tasks'];

	angular.module('tasks').controller('tasksController', tasksController);
})();