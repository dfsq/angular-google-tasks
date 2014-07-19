'use strict';

angular.module('googleTasks').controller('appController', ['$scope', 'application', 'googleService', function($scope, application, googleService) {

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