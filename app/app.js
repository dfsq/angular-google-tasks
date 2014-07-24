'use strict';

angular.module('googleTasks', [
	'ngRoute',
	'components.services',
	'login',
	'tasklists'
])

.run(['$rootScope', '$timeout', '$q', '$location', 'application', 'googleService', 'security',
function ($rootScope, $timeout, $q, $location, application, googleService, security) {

	/** @property signed_in */
		
	// Load Google API library
	var gapiPromise = googleService.load().then(function(data) {
		debugger
		console.log('gapi loaded', data);
		security.authObject = data;
	});
		
	// Splash screen will be visible at least 500ms
	var timeout = $timeout(angular.noop, 1000, false),
		routeChangePromise = $q.defer(),
		onRouteChangeSuccess = $rootScope.$on('$routeChangeSuccess', function () {
			routeChangePromise.resolve();
			onRouteChangeSuccess();
		});

	$q.all([timeout, gapiPromise, routeChangePromise.promise]).then(application.ready);

	// Listen route change events
	$rootScope.$on('$locationChangeStart', function () {

		console.log('LOCATION CHANGE START', $location.path());

		var path = $location.path();

		if (path === '' || path === '/') {
			application.ready(function () {
				var redirectPath = security.isSignedIn() ? '/tasklists' : '/login';
				$location.path(redirectPath);
			});
		}
	});

	// On route change error redirect
	var resolveOnce = false;
	$rootScope.$on('$routeChangeError', function (event, current) {

		if (!resolveOnce) {
			resolveOnce = true;
			routeChangePromise.resolve();
			onRouteChangeSuccess();
		}

		application.ready(function () {

			var onRouteError = current.onRouteError;

			if (onRouteError) {
				if (onRouteError.redirectTo) {
					$location.path(onRouteError.redirectTo);
				}
			}
		});
	});

}]);