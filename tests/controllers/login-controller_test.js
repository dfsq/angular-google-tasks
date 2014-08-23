'use strict';

describe('Login controller', function() {

	var loginController,
		$rootScope,
		$scope,
		$location,
		$q,
		googleApi = {
			login: function() {
				var deferred = $q.defer();
				deferred.resolve();
				return deferred.promise;
			}
		},
		security = {
			authObject: null
		};

	beforeEach(module('googleTasks'));

	beforeEach(inject(function($injector, $controller, _$rootScope_) {

		$rootScope = _$rootScope_;
		$scope = $rootScope.$new();
		$location = $injector.get('$location');
		$q = $injector.get('$q');

		loginController = $controller('loginController', {
			$scope: $scope,
			googleApi: googleApi,
			security: security
		});

	}));

	it('should define method login', function() {
		expect($scope.login).toBeDefined();
	});

	it('should set security.authObject afted login', function() {
		expect(security.authObject).toBe(null);
		$scope.login();
		expect(security.authObject).toNotBe(null);
	});

});