'use strict';

module.exports = function(config) {
	config.set({
		basePath: '',
		frameworks: ['jasmine'],
		files: [
			'app/bower_components/angular/angular.js',
			'app/bower_components/angular-route/angular-route.js',
			'app/bower_components/angular-resource/angular-resource.js',
			'app/bower_components/angular-mocks/angular-mocks.js',
			
			'app/app.js',
			'app/app-controller.js',
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