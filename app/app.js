'use strict';

angular.module('googleTasks', [
	'ngRoute',
	'components.services',
	'login',
	'tasklists'
])

.run(['$timeout', '$q', '$location', 'application', 'googleService', 
function ($timeout, $q, $location, application, googleService) {

	/** @property signed_in */
		
	// Load Google API library
	var gapiPromise = googleService.load().then(function(data) {
		console.log('gapi loaded', data);
		
		if (!data.status.signed_in) {
			$location.path('/login');
		}
		else {
			$location.path('/tasklists');
		}
	});
		
	// Splash screen will be visible at least 500ms
	var timeout = $timeout(angular.noop, 1000, false);

	$q.all([timeout, gapiPromise]).then(application.ready);

}]);