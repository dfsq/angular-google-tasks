'use strict';

angular.module('googleTasks').controller('appController', ['$scope', '$route', 'application', function($scope, $route, application) {
	application.ready(function () {
		$scope.appReady = true;
	});

	$scope.$on('$routeChangeSuccess', function(newVal, oldVal) {
		if (oldVal !== newVal) {
			$scope.routeClassName = $route.current.page.className;
			document.title = $route.current.page.title;
		}
	});
}]);