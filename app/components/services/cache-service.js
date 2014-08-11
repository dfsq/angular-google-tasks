'use strict';

angular.module('components.services.cache', []).factory('cache', ['$q', function($q) {
	
	var cacheData = {};
	
	function cacheFunction(key, setterFunction) {
		
		if (cacheData[key]) {
			return $q.when(cacheData[key]);
		}
		
		return setterFunction().then(function(data) {
			cacheData[key] = data;
			return data;
		});
	}
	
	cacheFunction.get = function(key) {
		return cacheData;
	};
	
	window.cache = cacheFunction;
	
	return cacheFunction;
}]);
