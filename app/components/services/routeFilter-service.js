'use strict';

/**
* @name routeFilterProvider
*/
angular.module('components.services.routeFilter', ['ngRoute']).provider('routeFilter', ['$routeProvider', function ($routeProvider) {

	var registeredFilters = {};

	function getExtendedConfig(path) {
		for (var key in registeredFilters) {
			if (new RegExp(key).test(path)) {
				return registeredFilters[key];
			}
		}
		return {};
	}

	/**
	 * Register new path filter. Accepts regular expression string.
	 * Filter can contain wildcards:
	 *  :path - matches sub path, e.g. /some/sub/path
	 * @param path
	 * @param rule
	 */
	this.registerFilter = function (path, rule) {
		path = '^' + path.replace(/\//g, '\\/').replace(/:path/g, '(\\/.+?)') + '$';
		registeredFilters[path] = rule;
	};

	// TODO: deep extend is needed here
	this.when = function (path, config) {
		config = angular.element.extend(true, getExtendedConfig(path), config);
		$routeProvider.when(path, config);
		return this;
	};

	this.otherwise = $routeProvider.otherwise;

	this.$get = angular.noop;
}]);