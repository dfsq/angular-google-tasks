(function() {
	'use strict';

	function tasksController($scope, $routeParams, $modal, cache, tasks) {

		$scope.title = $routeParams.title;

		$scope.addTask = function() {
			$modal.open({
				templateUrl: 'tasks/addTask.html',
				scope: $scope,
				size: 'sm'
			});
		};

		$scope.saveTask = function() {
			tasks.createTask($routeParams.id, {title: $scope.newTask.name}).then(function() {
				cache.clear('tasks' + $routeParams.id);
				loadTasks();
			});
		};

		function loadTasks() {
			tasks.getTasks($routeParams.id).then(function(data) {
				$scope.tasks = data;
			});
		}

		loadTasks();
	}

	tasksController.$inject = ['$scope', '$routeParams', '$modal', 'cache', 'tasks'];

	angular.module('tasks').controller('tasksController', tasksController);
})();