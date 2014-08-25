'use strict';

describe('Tasklists controller', function() {

	var tasklistsController,
		$q,
		$scope,
		taskListsObject = {},
		tasksService = {
			getTaskLists: function() {
				var deferred = $q.defer();
				deferred.resolve(taskListsObject);
				return deferred.promise;
			}
		};

	beforeEach(module('googleTasks'));

	beforeEach(inject(function($injector, $controller, $rootScope) {

		$q = $injector.get('$q');
		$scope = $rootScope.$new();

		tasklistsController = $controller('tasklistsController', {
			$scope: $scope,
			tasks: tasksService
		});

		$scope.$digest();
	}));


	it('Should set $scope.taskLists object', function() {
		expect($scope.taskLists).toBe(taskListsObject);
	});
});