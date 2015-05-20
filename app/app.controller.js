(function () {

	'use strict';

	function appController($scope, $route, application) {

		application.ready(function () {
			$scope.appReady = true;
		});

		$scope.$on('$routeChangeSuccess', function (newVal, oldVal) {
			console.log('inside hangeler');
			if (oldVal !== newVal) {
				$scope.routeClassName = $route.current.page.className;
				document.title = $route.current.page.title;
			}
		});

		$scope.back = function () {
			window.history.back();
		};
	}

	appController.$inject = ['$scope', '$route', 'application'];

	angular.module('googleTasks').controller('appController', appController);

})();