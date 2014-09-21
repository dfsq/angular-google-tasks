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
		spyOn(tasksService, 'getTasks').and.callThrough();
	}));


	it('should have cache undefined at first', function() {
		expect(cacheService.get('tasks123')).toBeUndefined();
	});

	it('should make request only once for noncached request and populate cache', function() {

		// Get tasks fo for the first time
		cacheService('tasks123', function() {
			return tasksService.getTasks();
		});
		$rootScope.$digest();

		expect(cacheService.get('tasks123')).toBe(tasksObject);
		expect(tasksService.getTasks).toHaveBeenCalled();
		expect(tasksService.getTasks.calls.count()).toBe(1);

		// Get tasks one more time'
		cacheService('tasks123', function() {
			return tasksService.getTasks();
		});
		$rootScope.$digest();

		expect(cacheService.get('tasks123')).toBe(tasksObject);
		expect(tasksService.getTasks.calls.count()).toBe(1);

	});

	it('should clear cache', function() {

		// Get tasks fo for the first time
		cacheService('tasks123', function() {
			return tasksService.getTasks();
		});
		$rootScope.$digest();

		expect(cacheService.get('tasks123')).toBe(tasksObject);

		cacheService.clear('tasks123');
		expect(cacheService.get('tasks123')).toBeUndefined();
	});

});