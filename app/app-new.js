'use strict';

angular.module('googleTasksk', [
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

	.run(['$rootScope', '$timeout', '$q', '$location', 'googleApi', 'application', function($rootScope, $timeout, $q, $location, googleApi, application) {

//		var timeout = $timeout(angular.noop, 500, false);
		
//		$q.all([timeout, /*gapiPromise,*/ routeChangePromise.promise]).then(application.ready);
		
	}]);