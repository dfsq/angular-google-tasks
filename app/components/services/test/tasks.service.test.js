'use strict';

describe('Tasks service', function() {

	var basePath = 'https://www.googleapis.com/tasks/v1',
		$rootScope,
		tasksService,
		cacheService,
		tasksResponse = [
			{id: 1},
			{id: 2, parent: 1},
			{id: 3, parent: 2},
			{id: 4, parent: 1},
			{id: 5}
		],
		groupedTasksData = [
			{
				id: 1,
				children: [
					{
						id: 2,
						parent: 1,
						children: [
							{id: 3, parent: 2}
						]
					},
					{id: 4, parent: 1}
				]
			},
			{id: 5}
		],
		$httpBackend;

	beforeEach(module('googleTasks'));

	beforeEach(inject(function($injector, $window) {
		$window.gapi = {
			auth: {
				getToken: function() {
					return {
						access_token: 'xxx'
					};
				}
			}
		};

		$rootScope = $injector.get('$rootScope');
		tasksService = $injector.get('tasks');
		cacheService = $injector.get('cache');
		$httpBackend = $injector.get('$httpBackend');
	}));

	it('should define tasks service', function() {
		expect(tasksService).toBeDefined();
	});

	describe('getTasks method', function() {

		var url = basePath + '/lists/123/tasks?access_token=xxx';

		beforeEach(function() {
			$httpBackend.when('GET', url).respond({
				items: tasksResponse
			});
		});

		afterEach(function() {
			$httpBackend.verifyNoOutstandingExpectation();
			$httpBackend.verifyNoOutstandingRequest();
		});

		it('should define method "getTasks"', function() {
			expect(tasksService.getTasks).toBeDefined();
		});

		it('should load and group tasks', function() {
			var tasksData = null;
			tasksService.getTasks(123).then(function(data) {
				tasksData = data;
			});
			$httpBackend.flush();
			expect(tasksData).toEqual(groupedTasksData);
		});

		it('should make API request only once and use cache for subsequent', function() {
			$httpBackend.expectGET(url);
			tasksService.getTasks(123);
			$httpBackend.flush();

			// Get tasks one more time, this time no request should be made
			tasksService.getTasks(123);
		});

		it('should cache tasks requests', function() {
			tasksService.getTasks(123);
			$httpBackend.flush();
			expect(cacheService.get('tasks123')).toEqual(groupedTasksData);
		});

		it('should clear cache and make new request', function() {
			tasksService.getTasks(123);
			$httpBackend.flush();
			expect(cacheService.get('tasks123')).toEqual(groupedTasksData);

			// Again new request must be made, so need to flush it
			tasksService.getTasks(123, true);
			$httpBackend.flush();
		});
	});

});