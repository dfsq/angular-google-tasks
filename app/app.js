'use strict';

angular.module('googleTasks', [
	'ngRoute',
	'components.services.application'
]);

angular.module('googleTasks').run(['$timeout', '$q', 'application', 'googleService', function ($timeout, $q, application, googleService) {

	// Load Google API library
	var gapiPromise = googleService.load().then(function(data) {
		console.log('gapi loaded', data);
	});
		
	// Splash screen will be visible at least 500ms
	var timeout = $timeout(angular.noop, 1000, false);

	$q.all([timeout, gapiPromise]).then(application.ready);

}]);