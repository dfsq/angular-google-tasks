'use strict';

angular.module('login').controller('loginController', ['$scope', '$location', 'googleService', function($scope, $location, googleService) {
	$scope.login = function() {
		googleService.login().then(function(data) {
			console.log('ok', data);
			$location.path('/tasklists');
		}, function(data) {
			console.log('not ok', data);
		});
	};
}]);
