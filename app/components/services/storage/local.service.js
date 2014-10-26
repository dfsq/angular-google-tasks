(function () {
	'use strict';

	function local() {

		/**
		 * Storage type: localStorage, sessionStorage.
		 * @type {Storage}
		 */
		var storage = localStorage,
			service = {};

		/**
		 * Simple setter function.
		 * @param key {String}
		 * @param value {*}
		 */
		service.set = function(key, value) {
			value = JSON.stringify(value);
			storage.setItem(key, value);
		};

		/**
		 * Simple getter function.
		 * @param key {String}
		 * @returns {*}
		 */
		service.get = function(key) {
			return JSON.parse(storage.getItem(key) || 'null');
		};
		
		return service;
	}

	angular.module('storage.local', []).factory('local', local);

})();