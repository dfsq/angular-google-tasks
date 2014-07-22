'use strict';

angular.module('googleTasks').controller('appController', ['$scope', 'application', function($scope, application) {
	application.ready(function () {
		$scope.appReady = application.isReady;
	});
}]);