module.exports = function(grunt) {
  'use strict';

  // Project configuration.
  grunt.initConfig({
    qunit: ['tests/index.html'],
    watch: {
      test: {
        files: ['initials.js', 'tests/**/*'],
        tasks: ['test']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('test', ['qunit']);
  grunt.registerTask('default', ['watch']);
};