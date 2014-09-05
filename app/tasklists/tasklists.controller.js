(function() {
	'use strict';

	function tasklistsController($scope, tasks) {
		tasks.getTaskLists().then(function(data) {
			$scope.taskLists = data;
		});
	}

	tasklistsController.$inject = ['$scope', 'tasks'];

	angular.module('tasklists').controller('tasklistsController', tasklistsController);
})();