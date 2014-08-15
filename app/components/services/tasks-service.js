'use strict';

angular.module('components.services.tasks', []).factory('tasks', ['$http', 'cache', function($http, cache) {
	
	var basePath = 'https://www.googleapis.com/tasks/v1',
		params = {
			params: {access_token: gapi.auth.getToken().access_token}
		};

	return {
		
		/** @property items */
			
		getTaskLists: function() {
			return cache('tasklists', function() {
				return $http.get(basePath + '/users/@me/lists', params).then(function(response) {
					return response.data.items;
				});
			});
		},
		
		getTasks: function(tasklist) {
			return cache('tasks' + tasklist, function() {
				return $http.get(basePath + '/lists/' + tasklist + '/tasks', params).then(function(response) {
					return response.data.items;
				});
			});
		}
	};
}]);
