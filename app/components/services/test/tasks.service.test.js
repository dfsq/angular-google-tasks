'use strict';

describe('Tasks service', function() {

	var basePath = 'https://www.googleapis.com/tasks/v1',
		tasks,
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

		tasks = $injector.get('tasks');
		$httpBackend = $injector.get('$httpBackend');
	}));

	it('should define tasks service', function() {
		expect(tasks).toBeDefined();
	});

	describe('getTasks method', function() {

		beforeEach(function() {
			$httpBackend.when('GET', basePath + '/lists/1/tasks?access_token=xxx').respond({
				items: tasksResponse
			});
		});

		it('should define method "getTasks"', function() {
			expect(tasks.getTasks).toBeDefined();
		});

		it('should load and group tasks', function() {
			var tasksData = null;
			tasks.getTasks(1).then(function(data) {
				tasksData = data;
			});
			$httpBackend.flush();
			expect(tasksData).toEqual(groupedTasksData);
		});
	});

});