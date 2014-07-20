'use strict';

/* TODO: think of better service organization, maybe resources? */
angular.module('components.services.tasks', []).factory('tasks', ['$http', function($http) {
	
	var basePath = 'https://www.googleapis.com/tasks/v1';
	
	return {
		getTaskLists: function() {
			var oauthToken = gapi.auth.getToken();
			return $http.get(basePath + '/users/@me/lists', {
				params: {access_token: oauthToken.access_token}
			})
			.then(function(response) { return response.data.items; })
		},
		getTasks: function(tasklist) {
			var oauthToken = gapi.auth.getToken();
			return $http.get(basePath + '/lists/' + tasklist + '/tasks', {
				params: {access_token: oauthToken.access_token}
			})
			.then(function(response) { return response.data.items; })
		}
	};
}]);
