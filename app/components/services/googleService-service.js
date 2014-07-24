'use strict';

/**
 * @class googleService
 */
angular.module('components.services.googleService', []).factory('googleService', ['$http', '$rootScope', '$q', function($http, $rootScope, $q) {

	var clientId = '421579928051-79o2r8382t52m5tdls381l4rlns6hr95.apps.googleusercontent.com',
		apiKey = 'AIzaSyCoFGS6BzXCErahLsI8GFsOP-xQ5P7Qc0U',
		scopes = 'https://www.googleapis.com/auth/tasks',
		deferred,
		service;

	service = {
		
		load: function() {
			
			var loadedDeferred = $q.defer();
			
			deferred = $q.defer();
			deferred.promise.then(function(data) {
				loadedDeferred.resolve(data);
			}, function(data) {
				loadedDeferred.resolve(data);
			});
			
			window.gapiLoaded = service.handleClientLoad;
			
			var script = document.createElement('script');
			script.src = 'https://apis.google.com/js/client.js?onload=gapiLoaded';
			document.body.appendChild(script);
			
			return loadedDeferred.promise;
		},
		
		handleClientLoad: function() {
			gapi.client.setApiKey(apiKey);
			window.setTimeout(service.checkAuth, 1);
		},
		
		checkAuth: function(immediate) {
			gapi.auth.authorize({
				client_id: clientId,
				scope: scopes,
				immediate: typeof immediate === 'undefined' ? true : immediate
			}, service.handleAuthResult);
		},
		
		handleAuthResult: function(authResult) {
			if (authResult && !authResult.error) {
				deferred.resolve(authResult);
			}
			else {
				deferred.reject(authResult);
			}
		},

		login: function() {
			deferred = $q.defer();
			service.checkAuth(false);
			return deferred.promise;
		}
	};
	
	return service;

}]);