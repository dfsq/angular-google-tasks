'use strict';

module.exports = function(grunt) {

	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-usemin');
	grunt.loadNpmTasks('grunt-karma');
	grunt.loadNpmTasks('grunt-gh-deploy');

	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		connect: {
			server: {
				options: {
					hostname: 'localhost',
					port: 9999,
					keepalive: true
				}
			}
		},

		clean: {
			pre: ['dist'],
			post: ['dist/assets/scripts/vendors.js', 'dist/assets/scripts/scripts.js'],
			deploy: ['tmp']
		},

		copy: {
			build: {
				files: [
					{src: 'README.md', dest: './dist/README.md'},
					{
						expand: true,
						cwd: './app',
						src: ['./**/*.html', 'assets/images/**', 'favicon.ico'],
						dest: 'dist'
					}
				]
			}
		},

		concat: {
			styles: {
				files: {
					'dist/assets/styles/vendors.css': [
						'bower_components/bootstrap/dist/css/bootstrap.min.css'
					],
					'dist/assets/styles/styles.css': ['app/**/*.css']
				}
			},
			scripts: {
				src: ['app/**/*.config.js', 'app/**/*.+(controller|directive|service).js', '!app/**/*.test.js'],
				dest: 'dist/assets/scripts/scripts.js'
			},
			vendors: {
				src: [
					'bower_components/angular/angular.min.js',
					'bower_components/angular-route/angular-route.min.js',
					'bower_components/angular-animate/angular-animate.min.js',
					'bower_components/angular-sanitize/angular-sanitize.min.js',
					'bower_components/angular-bootstrap/ui-bootstrap.min.js',
					'bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js'
				],
				dest: 'dist/assets/scripts/vendors.min.js'
			}
		},

		uglify: {
			build: {
				options: {
					mangle: false,
					banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd hh:MM") %> */\n'
				},
				files: {
					'dist/assets/scripts/scripts.min.js': 'dist/assets/scripts/scripts.js'
				}
			}
		},

		usemin: {
			html: ['dist/index.html']
		},

		karma: {
			unit: {
				configFile: 'karma.conf.js'
			},
			dist: {
				configFile: 'karma.dist.conf.js'
			}
		},

		ghDeploy: {
			options: {
				repository: 'https://github.com/dfsq/angular-google-tasks.git',
				deployPath: 'dist'
			}
		}
	});

	grunt.registerTask('build', [
		'karma:unit',
		'clean:pre',
		'copy',
		'concat',
		'uglify',
		'clean:post',
		'usemin'
	]);

	grunt.registerTask('deploy', function() {
		grunt.task.run('build');
		grunt.task.run('karma:dist');
		grunt.task.run('clean:deploy');
		grunt.task.run('ghDeploy');
	});

	grunt.registerTask('server', ['connect']);

	grunt.registerTask('default', ['server']);

};
