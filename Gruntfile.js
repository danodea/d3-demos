module.exports = function(grunt) {

  grunt.initConfig({
    watch: {
    	js: {
	    	files: ['bar-chart-demos/*', 'mls-demo/*'],
		    options: {
		      livereload: true,
		    }
		}
	},
  });

  grunt.loadNpmTasks('grunt-contrib-watch');

  // grunt.registerTask('default', ['watch']);

};