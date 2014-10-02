'use strict';

describe('Tasklists controller', function() {

	var tasklistsController,
		$q,
		$scope,
		$rootScope,
		taskListsObject = {},
		tasksService = {
			getTaskLists: function() {
				var deferred = $q.defer();
				deferred.resolve(taskListsObject);
				return deferred.promise;
			},
			deleteTaskList: function(tasklistId) {
				return $q.when(true);
			}
		};

	beforeEach(module('googleTasks'));

	beforeEach(inject(function($injector, $controller) {

		$q = $injector.get('$q');
		$rootScope = $injector.get('$rootScope');
		$scope = $rootScope.$new();

		tasklistsController = $controller('tasklistsController', {
			$scope: $scope,
			tasks: tasksService
		});

		$scope.$digest();

		spyOn(tasksService, 'deleteTaskList').and.callThrough();
	}));


	it('Should set $scope.taskLists object', function() {
		expect($scope.taskLists).toBe(taskListsObject);
	});

	it('should delete tasklist', function() {
		$scope.delete(1);
		$rootScope.$digest();
		expect(tasksService.deleteTaskList).toHaveBeenCalled();
	});
});