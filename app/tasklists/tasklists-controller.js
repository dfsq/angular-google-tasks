'use strict';

angular.module('tasklists').controller('tasklistsController', ['$scope', 'tasks', function($scope, tasks) {
	tasks.getTaskLists().then(function(data) {
		$scope.taskLists = data;
	});
}]);
