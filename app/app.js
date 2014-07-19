'use strict';

angular.module('googleTasks', [
	'ngRoute',
	'components.services.application'
]);

angular.module('googleTasks').run(['$timeout', '$q', 'application', 'googleService', function ($timeout, $q, application, googleService) {

	// Load Google API library
	var gapiPromise = googleService.load().catch(function (result) {
		console.log('gapi loaded, auth status', result);
		return true;
	});
		
	// Splash screen will be visible at least 500ms
	var timeout = $timeout(angular.noop, 1000, false);

	$q.all([timeout, gapiPromise]).then(application.ready);

}]);