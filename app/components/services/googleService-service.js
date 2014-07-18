'use strict';

/**
 * @class googleService
 */
angular.module('components.services.application').service('googleService', ['$http', '$rootScope', '$q', function($http, $rootScope, $q) {

	window.auth = this;

	var clientId = '421579928051-79o2r8382t52m5tdls381l4rlns6hr95.apps.googleusercontent.com',
		apiKey = 'AIzaSyCoFGS6BzXCErahLsI8GFsOP-xQ5P7Qc0U',
		scopes = 'https://www.googleapis.com/auth/tasks',
		deferred = $q.defer(),
		self = this;

	this.handleClientLoad = function() {
		gapi.client.setApiKey(apiKey);
		window.setTimeout(self.checkAuth, 1);
	};

	this.login = function() {
		this.checkAuth(false);
		return deferred.promise;
	};

	this.checkAuth = function(immediate) {
		gapi.auth.authorize({
			client_id: clientId,
			scope: scopes,
			immediate: typeof immediate === 'undefined' ? true : immediate
		}, self.handleAuthResult);
	};

	this.handleAuthResult = function(authResult) {
		if (authResult && !authResult.error) {
			var data = {};
			gapi.client.load('oauth2', 'v2', function () {
				var request = gapi.client.oauth2.userinfo.get();
				request.execute(function (resp) {
					data.email = resp.email;
				});
			});
			deferred.resolve(data);
		} else {
			deferred.reject('error');
		}
	};

}]);