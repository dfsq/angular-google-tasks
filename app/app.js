'use strict';

angular.module('googleTasks', [
	'ngRoute',
	'components.services.application'
]);

angular.module('googleTasks').run(['$timeout', '$q', 'application', 'googleService', function($timeout, $q, application, googleService) {

	// Load Google API library
	window.gapiLoaded = googleService.handleClientLoad;
	var script = document.createElement('script');
	script.src = 'https://apis.google.com/js/client.js?onload=gapiLoaded';
	document.body.appendChild(script);


	// Splash screen will be visible at least 500ms
	var timeout = $timeout(angular.noop, 1000, false);

	$q.all([timeout/*, security.requestUser()*/]).then(application.ready);

}]);