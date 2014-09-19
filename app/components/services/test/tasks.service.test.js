'use strict';

describe('Tasks service', function() {

	var tasks;

	beforeEach(module('googleTasks'));

	beforeEach(inject(function($injector, $window) {
		$window.gapi = {
			auth: {
				getToken: function() {
					return {
						access_token: {}
					};
				}
			}
		};
		tasks = $injector.get('tasks');
	}));

	it('should define tasks service', function() {
		expect(tasks).toBeDefined();
	});

});