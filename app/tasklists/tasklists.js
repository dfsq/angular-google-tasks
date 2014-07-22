'use strict';

angular.module('tasklists', ['ngRoute'], ['$routeProvider', function($routeProvider) {
	$routeProvider.when('/tasklists', {
		templateUrl: 'tasklists/tasklists.html',
		controller: 'tasklistsController'
	});
}]);
