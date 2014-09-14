(function () {
	'use strict';

	function addTask($scope, $routeParams, $modalInstance, tasks) {

		$scope.newTask = {};

		$scope.saveTask = function() {
			tasks.createTask($routeParams.id, {title: $scope.newTask.name}).then(function() {
				$modalInstance.close();
			});
		};
	}

	addTask.$inject = ['$scope', '$routeParams', '$modalInstance', 'tasks'];

	angular.module('tasks').controller('addTaskController', addTask);
})();