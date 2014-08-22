'use strict';

module.exports = function(config) {
	config.set({
		basePath: '',
		frameworks: ['jasmine'],
		files: [
			'app/bower_components/angular/angular.js',
			'app/bower_components/angular-route/angular-route.js',
			'app/bower_components/angular-animate/angular-animate.js',
			'app/bower_components/angular-mocks/angular-mocks.js',

			'app/app.js',
			'app/app-controller.js',
			'app/components/services/services.js',
			'app/components/services/*-service.js',
			'app/components/services/security/security.js',
			'app/components/services/security/*-service.js',
			'app/components/directives/directives.js',
			'app/components/directives/*-directive.js',
			'app/login/login.js',
			'app/login/login-controller.js',
			'app/tasklists/tasklists.js',
			'app/tasklists/tasklists-controller.js',
			'app/tasks/tasks.js',
			'app/tasks/tasks-controller.js',
			'tests/**/*.js'
		],
		exclude: [],
		plugins: [
			'karma-phantomjs-launcher',
			'karma-jasmine'
		],
		port: 9090,
		browsers: ['PhantomJS'],
		singleRun: true,
		colors: true,
		logLevel: config.LOG_INFO
	});
};