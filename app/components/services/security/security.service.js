'use strict';

angular.module('components.services.security').provider('security', {

	requestSignedIn: ['security', function(security) {
		return security.requestSignedIn();
	}],
	
	requestGuest: ['security', function(security) {
		return security.requestGuest();
	}],

	$get: ['$q', function($q) {

		var service = {
			
			authState: null,
			
			authObject: null,

			setAuthObject: function(data) {
				service.authObject = data;
				return service.authObject;
			},
			
			isSignedIn: function() {
				return this.authObject && this.authObject.status && this.authObject.status.signed_in;
			},

			requestAuthState: function() {
				if (service.authObject) {
					return $q.when(service.authObject);
				}
				else {
					return service.authState;
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
