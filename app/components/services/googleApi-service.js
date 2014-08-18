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
			 * @param loginCheck {boolean}
			 * @returns {promise}
			 */
			init: function(loginCheck) {

				var deferred = $q.defer();

				window.gapiLoaded = function() {
					gapi.client.setApiKey(config.apiKey);
					delete window.gapiLoaded;
					deferred.resolve();
				};

				var script = document.createElement('script');
				script.src = 'https://apis.google.com/js/client.js?onload=gapiLoaded';
				document.body.appendChild(script);

				if (typeof loginCheck === 'undefined') {
					loginCheck = true;
				}

				if (loginCheck) {
					return deferred.promise.then(function() {
						return service.login(true).then(function(data) {
							return data;
						}, function(data) {
							return data;
						});
					});
				}

				return deferred.promise;
			},

			login: function(immediate) {
				var deferred = $q.defer();
				window.setTimeout(function() {
					service.checkAuth(typeof immediate === 'undefined' ? false : immediate, deferred);
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
	}];
});
