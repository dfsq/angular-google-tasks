'use strict';

angular.module('googleTasks', [
	'ngRoute',
	'components.services.application'
])

angular.module('googleTasks').run(['$timeout', '$q', 'application', function($timeout, $q, application) {

	// Splash screen will be visible at least 500ms
	var timeout = $timeout(angular.noop, 1000, false);

	$q.all([timeout/*, security.requestUser()*/]).then(application.ready);

}]);