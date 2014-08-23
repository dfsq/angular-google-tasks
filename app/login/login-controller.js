(function() {
	'use strict';

	function loginController($scope, $location, googleApi, security) {
		$scope.login = function() {
			googleApi.login().then(function(data) {
				console.log('ok', data);
				security.authObject = data;
				$location.path('/tasklists');
			}, function(data) {
				console.log('not ok', data);
			});
		};
	}

	loginController.$inject = ['$scope', '$location', 'googleApi', 'security'];

	angular.module('login').controller('loginController', loginController);
})();