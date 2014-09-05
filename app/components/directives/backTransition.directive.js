(function() {
	'use strict';

	function backTransition($rootScope, $location) {
		return {
			link: function(scope, element) {

				var backClass = 'reverse';

				$rootScope.$on('$locationChangeSuccess', function() {
					$rootScope.currentPath = $location.path();
					element.removeClass(backClass);
				});

				$rootScope.$watch(function() { return $location.path(); }, function (newPath) {
					if($rootScope.currentPath === newPath) {
						element.addClass(backClass);
					}
				});
			}
		};
	}

	backTransition.$inject = ['$rootScope', '$location'];

	angular.module('components.directives').directive('backTransition', backTransition);

})();