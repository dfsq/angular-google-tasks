'use strict';

angular.module('googleTasks').controller('appController', ['$scope', 'application', 'googleService', 'tasks', function($scope, application, googleService, tasks) {

	window.tasks = tasks;
	
	application.ready(function () {
		$scope.appReady = application.isReady;
	});
	
	$scope.login = function() {
		googleService.login().then(function(data) {
			console.log('ok', data);
		}, function(data) {
			console.log('not ok', data);
		});
	};

}]);