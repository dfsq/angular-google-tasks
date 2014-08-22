'use strict';

describe('Login controller', function() {

	var loginController,
		$rootScope,
		$scope;

	beforeEach(module('googleTasks'));

	beforeEach(inject(function($injector, $controller, _$rootScope_) {

		$rootScope = _$rootScope_;
		$scope = $rootScope.$new();

		loginController = $controller('loginController', {
			scope: $scope
		});

	}));

	it('should define method login', function() {
		expect($scope.login).toBeDefined();
	});

});