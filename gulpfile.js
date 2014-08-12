'use strict';

var gulp = require('gulp');

gulp.task('test', function() {
	
	var karma = require('gulp-karma');

	// See http://stackoverflow.com/questions/22413767/angular-testing-with-karma-module-is-not-defined
	return gulp.src('noop').pipe(karma({
		configFile: 'karma.conf.js',
		action: 'run'
	}));
});