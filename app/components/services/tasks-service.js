(function() {
	'use strict';

	function tasks($http, cache) {
		
		var basePath = 'https://www.googleapis.com/tasks/v1',
			params = {
				params: {
					access_token: gapi.auth.getToken().access_token
				}
			};

		/**
		 * Group task items by parent.
		 * @param tasks {Array}
		 */
		function groupTasks(tasks) {
			var idIndexMap = {};
			tasks.forEach(function(task, index) {
				idIndexMap[task.id] = index;
				if (task.parent) {
					var parent = tasks[idIndexMap[task.parent]];
					parent.children = parent.children || [];
					parent.children.push(task);
				}
			});
			return tasks;
		}

		return {

			/** @property items */

			getTaskLists: function() {
				return cache('tasklists', function() {
					return $http.get(basePath + '/users/@me/lists', params).then(function(response) {
						return response.data.items;
					});
				});
			},

			getTasks: function(tasklistId) {
				return cache('tasks' + tasklistId, function() {
					return $http.get(basePath + '/lists/' + tasklistId + '/tasks', params).then(function(response) {
						return groupTasks(response.data.items);
					});
				});
			}
		};
	}
	
	tasks.$inject = ['$http', 'cache'];
	
	angular.module('components.services.tasks', []).factory('tasks', tasks);
})();