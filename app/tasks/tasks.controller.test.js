'use strict';

describe('Tasks controller', function() {

	var tasksController,
		$q,
		$scope,
		routeParams = {
			id: 'xxx',
			title: 'Some title'
		},
		tasksObject = {},
		tasksService = {
			getTasks: function() {
				var deferred = $q.defer();
				deferred.resolve(tasksObject);
				return deferred.promise;
			}
		};

	beforeEach(module('googleTasks'));

	beforeEach(inject(function($injector, $controller, $rootScope) {

		$q = $injector.get('$q');
		$scope = $rootScope.$new();

		tasksController = $controller('tasksController', {
			$scope: $scope,
			$routeParams: routeParams,
			tasks: tasksService
		});

		$scope.$digest();
	}));


	it('Should set screen title', function() {
		expect($scope.title).toEqual(routeParams.title);
	});

	it('Should set $scope.tasks object', function() {
		expect($scope.tasks).toBe(tasksObject);
	});
});