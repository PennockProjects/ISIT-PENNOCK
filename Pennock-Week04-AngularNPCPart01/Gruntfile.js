module.exports = function(grunt) {

	grunt.initConfig({
		jshint: {
			files: ['*.js'],
			options: {
				ignores: ['angular.js', 'angular-mocks.js']
			}
		}
	});
	
	grunt.loadNpmTasks('grunt-contrib-jshint');
};