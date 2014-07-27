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
		
		return {
			/**
			 * Load client library.
			 * @returns {promise}
			 */
			load: function() {
				
				var deferred = $q.defer();
				
				window.gapiLoaded = function() {
					gapi.client.setApiKey(config.apiKey);
					deferred.resolve();
				};

				var script = document.createElement('script');
				script.src = 'https://apis.google.com/js/client.js?onload=gapiLoaded';
				document.body.appendChild(script);
				
				return deferred.promise;
			}
		};
	}]
});
