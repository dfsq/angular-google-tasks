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
			'app/!(bower_components)/**/!(*-*).js',
			'app/**/*-+(controller|directive|service).js',

			'app/**/*_test.js'
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