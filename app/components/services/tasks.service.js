(function() {
	'use strict';

	/**
	 * @see https://developers.google.com/google-apps/tasks/v1/reference/
	 * @param $http
	 * @param cache
	 * @returns {{getTaskLists: getTaskLists, getTasks: getTasks, moveTask: moveTask, createTask: createTask, deleteTask: deleteTask, updateTask: updateTask}}
	 */
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

			var idIndexMap = {}, task, i;

			for (i = 0; i < tasks.length; i++) {

				task = tasks[i];
				idIndexMap[task.id] = task;

				if (task.parent) {
					var parent = idIndexMap[task.parent];
					if (parent) {
						parent.children = parent.children || [];
						parent.children.push(task);
						tasks.splice(i--, 1);
					}
				}
			}

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

			getTasks: function(tasklistId, refresh) {
				return cache('tasks' + tasklistId, function() {
					return $http.get(basePath + '/lists/' + tasklistId + '/tasks', params).then(function(response) {
						return groupTasks(response.data.items);
					});
				}, refresh);
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
			},

			/**
			 * Remove task from the list.
			 * DELETE https://www.googleapis.com/tasks/v1/lists/tasklist/tasks/task
			 */
			deleteTask: function(tasklistId, taskId) {
				return $http.delete(basePath + '/lists/' + tasklistId + '/tasks/' + taskId, params);
			},

			/**
			 * Update task attributes.
			 * PUT https://www.googleapis.com/tasks/v1/lists/tasklist/tasks/task
			 */
			updateTask: function(tasklistId, task, data) {
				task = angular.extend(task, data);
				return $http.put(basePath + '/lists/' + tasklistId + '/tasks/' + task.id, task, params);
			}
		};
	}

	tasks.$inject = ['$http', 'cache'];

	angular.module('components.services.tasks', []).factory('tasks', tasks);
})();