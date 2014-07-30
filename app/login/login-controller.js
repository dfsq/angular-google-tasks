'use strict';

angular.module('login').controller('loginController', ['$scope', '$location', 'googleApi', 'security', function($scope, $location, googleApi, security) {
	$scope.login = function() {
		googleApi.login().then(function(data) {
			console.log('ok', data);
			security.authObject = data;
			$location.path('/tasklists');
		}, function(data) {
			console.log('not ok', data);
		});
	};
}]);
