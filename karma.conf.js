'use strict';

module.exports = function(config) {
	config.set({
		basePath: '',
		frameworks: ['jasmine'],
		files: [
			'bower_components/angular/angular.js',
			'bower_components/angular-route/angular-route.js',
			'bower_components/angular-animate/angular-animate.js',
			'bower_components/angular-sanitize/angular-sanitize.js',
			'bower_components/angular-bootstrap/ui-bootstrap.min.js',
			'bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
			'bower_components/angular-mocks/angular-mocks.js',

			'app/**/*.config.js',
			'app/**/*.+(controller|directive|service).js',

			'app/**/*.test.js'
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