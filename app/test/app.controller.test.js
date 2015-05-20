'use strict';

describe('Application module', function () {

	var $rootScope,
		$scope,
		$injector,
		$location,
		controller,
		application;

	beforeEach(module('googleTasks'));

	beforeEach(inject(function (_$injector_, $controller, $httpBackend) {

		var routeMock = {
			current: {
				page: {
					className: 'some-class'
				}
			}
		};

		$injector = _$injector_;

		$rootScope = $injector.get('$rootScope');
		$scope = $rootScope.$new();
		$location = $injector.get('$location');
		application = $injector.get('application');

		controller = $controller('appController', {
			$scope: $scope,
			$route: routeMock,
			application: application
		});

		$httpBackend.whenGET('tasklists/tasklists.html').respond('');

	}));

	it('should subscribe to app reade hook', function () {
		expect($scope.appReady).toBe(undefined);
		application.ready();
		expect($scope.appReady).toBe(true);
	});

	it('should subscribe to $routeChangeSuccess event', function() {
		expect($scope.routeClassName).toBe(undefined);

		$rootScope.$broadcast('$routeChangeSuccess', {});
		$scope.$digest();

		expect($scope.routeClassName).toBe('some-class');
	});
});