'use strict';

describe('Application module', function() {
	
	beforeEach(module('googleTasks'));
	
	it('should load "googleTasks" module', function() {
		var module = angular.module('googleTasks');
		expect(module).toBeDefined();
	});
});