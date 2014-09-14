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
			},

			/**
			 * Moves the specified task to another position in the task list.
			 * This can include putting it as a child task under a new parent and/or move it to a different position among its sibling tasks.
			 * POST /lists/tasklist/tasks/task/move
			 * @see https://developers.google.com/google-apps/tasks/v1/reference/tasks/move
			 */
			moveTask: function(tasklistId, taskId) {
				return $http(basePath + '/lists/' + tasklistId + '/tasks/' + taskId + '/move', params);
			},

			/**
			 * Create new task.
			 * POST https://www.googleapis.com/tasks/v1/lists/tasklist/tasks
			 */
			createTask: function(tasklistId, data) {
				return $http.post(basePath + '/lists/' + tasklistId + '/tasks', data, params);
			}
		};
	}

	tasks.$inject = ['$http', 'cache'];

	angular.module('components.services.tasks', []).factory('tasks', tasks);
})();