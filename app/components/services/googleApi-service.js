'use strict';

/**
 * @class googleApiProvider
 */
angular.module('components.services.googleApi', []).provider('googleApi', function() {
	
	var config = {};
	
	this.setConfig = function(configObj) {
		config = configObj;
	};
	
	this.$get = function() {
		return function() {
			return {
				load: function() {}
			};
		};
	};
});
