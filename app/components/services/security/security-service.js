'use strict';

angular.module('components.services.security').provider('security', {

	requestSignedIn: ['security', function(security) {
		return security.requestSignedIn();
	}],
	
	requestGuest: ['security', function(security) {
		return security.requestGuest();
	}],

	$get: ['$q', 'googleApi', function($q, googleApi) {

		var service = {
			
			authObject: null,

			isSignedIn: function() {
				return this.authObject && this.authObject.status && this.authObject.status.signed_in;
			},

			requestAuthState: function() {
				if (service.authObject) {
					return $q.when(service.authObject);
				}
				else {
					return googleApi.login();
				}
			},

			requestSignedIn: function() {
				return service.requestAuthState().then(function() {
					return service.isSignedIn() ? true : $q.reject('authorization required');
				});
			},
			
			requestGuest: function() {
				return service.requestAuthState().then(function() {
					return service.isSignedIn() ? $q.reject('already signed in') : true;
				});
			}
		};

		return service;
	}]
});
