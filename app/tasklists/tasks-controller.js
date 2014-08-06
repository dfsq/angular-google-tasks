'use strict';

angular.module('tasklists').controller('tasksController', ['$scope', '$routeParams', 'tasks', function($scope, $routeParams, tasks) {
	tasks.getTasks($routeParams.id).then(function(data) {
		$scope.tasks = data;
		console.log(data);
	});
}]);
