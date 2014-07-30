'use strict';

/**
 * @class googleApiProvider
 */
angular.module('components.services.googleApi', []).provider('googleApi', function() {
	
	var config = {};
	
	this.setConfig = function(configObj) {
		config = configObj;
	};
	
	this.$get = ['$q', function($q) {
		
		var service = {
			/**
			 * Load client library.
			 * @returns {promise}
			 */
			load: function() {
				
				var deferred = $q.defer();
				
				window.gapiLoaded = function() {
					gapi.client.setApiKey(config.apiKey);
					delete window.gapiLoaded;
					deferred.resolve();
				};

				var script = document.createElement('script');
				script.src = 'https://apis.google.com/js/client.js?onload=gapiLoaded';
				document.body.appendChild(script);
				
				return deferred.promise;
			},

			login: function() {
				var deferred = $q.defer();
				window.setTimeout(function() {
					service.checkAuth(false, deferred);
				}, 1);
				return deferred.promise;
			},

			checkAuth: function(immediate, deferred) {

				function handleAuthResult(authResult) {
					if (authResult && !authResult.error) {
						deferred.resolve(authResult);
					}
					else {
						deferred.reject(authResult);
					}
				}
				
				gapi.auth.authorize({
					client_id: config.clientId,
					scope: config.scopes,
					immediate: immediate
				}, handleAuthResult);
			}
		};
		
		return service;
	}]
});
