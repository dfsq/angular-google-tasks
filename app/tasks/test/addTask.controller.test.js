'use strict';

describe('Add task controller', function() {

	var addTaskController,
		$q,
		$scope,
		$modalInstance = {},
		routeParams = { id: 'xxx' },
		taskObject = {},
		tasksService = {
			createTask: function() {
				return $q.when(taskObject);
			}
		};

	beforeEach(module('googleTasks'));

	beforeEach(inject(function($injector, $controller, $rootScope) {

		$q = $injector.get('$q');
		$scope = $rootScope.$new();

		addTaskController = $controller('addTaskController', {
			$scope: $scope,
			$routeParams: routeParams,
			$modalInstance: $modalInstance,
			tasks: tasksService
		});

		$scope.$digest();

		spyOn(tasksService, 'createTask').and.callThrough();
	}));


	it('Should call method tasks.createTask on saveTask', function() {
		$scope.saveTask();
		expect(tasksService.createTask).toHaveBeenCalled();
		expect(tasksService.createTask.calls.count()).toBe(1);
	});

});