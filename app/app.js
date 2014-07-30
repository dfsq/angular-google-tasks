'use strict';

angular.module('googleTasks', [
	'ngRoute',
	'components.services',
	'login',
	'tasklists'
])

	.config(['googleApiProvider', function(googleApiProvider) {
		googleApiProvider.setConfig({
			clientId: '421579928051-79o2r8382t52m5tdls381l4rlns6hr95.apps.googleusercontent.com',
			apiKey: 'AIzaSyCoFGS6BzXCErahLsI8GFsOP-xQ5P7Qc0U',
			scopes: ['https://www.googleapis.com/auth/tasks']	
		});
	}])

	.run(['$rootScope', '$timeout', '$q', '$location', 'application', 'googleApi', 'security', function ($rootScope, $timeout, $q, $location, application, googleApi, security) {
	
		/** @property signed_in */
			
		var gapiPromise = googleApi.load().then(function() {
			return googleApi.login(true).then(function(data) {
				return security.authObject = data;
			}, function(data) {
				return security.authObject = data;
			});
		}),
		
		// Splash screen will be visible at least 500ms
		timeout = $timeout(angular.noop, 1000, false),
			
		routeChangePromise = $q.defer(),
				
		onRouteChangeSuccess = $rootScope.$on('$routeChangeSuccess', function () {
			routeChangePromise.resolve();
			onRouteChangeSuccess();
		});
	
		// Need to remember this promise for the first time
		security.authState = gapiPromise;
		
		$q.all([timeout, gapiPromise, routeChangePromise.promise]).then(function() {
			application.ready();
		});
	
		// Listen route change events
		$rootScope.$on('$locationChangeStart', function () {
			
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
				if (onRouteError && onRouteError.redirectTo) {
					$location.path(onRouteError.redirectTo);
				}
			});
		});
	
	}]);