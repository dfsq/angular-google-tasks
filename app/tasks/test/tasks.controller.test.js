'use strict';

describe('Tasks controller', function() {

	var tasksController,
		$q,
		$scope,
		$rootScope,
		routeParams = {
			id: 'xxx',
			title: 'Some title'
		},
		tasksObject = {},
		tasksService = {
			getTasks: function() {
				return $q.when(tasksObject);
			},
			deleteTask: function(tasklistId, taskId) {
				return $q.when(true);
			}
		},
		sModal = {
			open: function() {
				return $q.when(true);
			}
		};

	beforeEach(module('googleTasks'));

	beforeEach(inject(function($injector, $controller) {

		$q = $injector.get('$q');
		$rootScope = $injector.get('$rootScope');
		$scope = $rootScope.$new();

		tasksController = $controller('tasksController', {
			$scope: $scope,
			$routeParams: routeParams,
			sModal: sModal,
			tasks: tasksService
		});

		$scope.$digest();

		spyOn(tasksService, 'getTasks').and.callThrough();
		spyOn(tasksService, 'deleteTask').and.callThrough();
		spyOn(window, 'confirm').and.callFake(function() { return true; });
	}));


	it('Should set screen title', function() {
		expect($scope.title).toEqual(routeParams.title);
	});

	it('Should set $scope.tasks object', function() {
		expect($scope.tasks).toBe(tasksObject);
	});

	it('Should delete task and reload list', function() {
		$scope.deleteTask(1, 1);
		$rootScope.$digest();
		expect(tasksService.deleteTask).toHaveBeenCalled();
		expect(tasksService.getTasks).toHaveBeenCalled();
	});
});