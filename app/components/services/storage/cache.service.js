(function() {
	'use strict';

	function cache($q) {

		var cacheData = {};

		function cacheFunction(key, setterFunction, refresh) {

			if (refresh === true) {
				cacheFunction.clear(key);
			}

			if (cacheData[key]) {
				return $q.when(cacheData[key]);
			}

			return setterFunction().then(function(data) {
				cacheData[key] = data;
				return data;
			});
		}

		cacheFunction.get = function(key) {
			return cacheData[key];
		};

		cacheFunction.clear = function(key) {
			delete cacheData[key];
		};

		return cacheFunction;
	}

	cache.$inject = ['$q'];

	angular.module('storage.cache', []).factory('cache', cache);
})();
