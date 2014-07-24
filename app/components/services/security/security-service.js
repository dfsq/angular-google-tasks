'use strict';

angular.module('components.services.security').provider('security', {

	requestSignedIn: ['security', function(security) {
		return security.requestSignedIn();
	}],

	$get: ['$q', 'googleService', function($q, googleService) {

		var service = {
			authObject: null,

			isSignedIn: function() {
				return this.authObject && this.authObject.status && this.authObject.status.signed_in;
			},

			requestAuthState: function() {
				debugger
				if (service.isSignedIn()) {
					return $q.when(service.authObject);
				}
				else {
					return googleService.load();
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
