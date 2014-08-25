'use strict';

describe('Cache service', function() {

	var $q,
		$rootScope,
		cacheService,
		tasksObject = {},
		tasksService;

	beforeEach(module('googleTasks'));

	beforeEach(inject(function($injector, _$rootScope_) {
		$q = $injector.get('$q');
		$rootScope = _$rootScope_;
		cacheService = $injector.get('cache');
		tasksService = {
			getTasks: function() {
				return $q.when(tasksObject);
			}
		};
		spyOn(tasksService, 'getTasks').andCallThrough();
	}));


	it('should have cache undefined before the first request', function() {
		expect(cacheService.get('tasks:123456')).toBeUndefined();
	});

	it('should make request only once for noncached request and populate cache', function() {

		expect(cacheService.get('tasks:123')).toBeUndefined();

		// Get tasks fo for the first time
		cacheService('tasks:123', function() {
			return tasksService.getTasks();
		});
		$rootScope.$digest();

		expect(cacheService.get('tasks:123')).toBe(tasksObject);
		expect(tasksService.getTasks).toHaveBeenCalled();
		expect(tasksService.getTasks.callCount).toBe(1);

		// Get tasks one more time'
		cacheService('tasks:123', function() {
			return tasksService.getTasks();
		});
		$rootScope.$digest();

		expect(cacheService.get('tasks:123')).toBe(tasksObject);
		expect(tasksService.getTasks.callCount).toBe(1);

	});

});