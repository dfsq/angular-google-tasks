'use strict';

angular.module('components.services.application', []).factory('application', ['$q', function ($q) {

	var stack = [],

	service = {

		isReady: false,

		ready: function (callback) {
			if (typeof callback === 'function') {
				if (service.isReady) {
					callback();
				}
				else {
					stack.push(callback);
				}
			}
			else {
				service.isReady = true;
				for (var i = stack.length - 1; i >= 0; i--) {
					stack[i]();
				}
			}
		},

		readyState: function () {
			var deferred = $q.defer();
			service.ready(deferred.resolve);
			return deferred.promise;
		}
	};

	return service;
}]);