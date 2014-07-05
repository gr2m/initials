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
    },

    release: {
      options: {
        tasks: ['changelog'],
        bump: {
          commitMessage: 'chore(release): %VERSION%',
          files: ['package.json', 'bower.json'],
          commitFiles: [
            'Gruntfile.js',
            'initials.js',
            'index.html',
            'tests/*',
            'CHANGELOG.md',
            'bower.json',
            'package.json'
          ],
          pushTo: 'origin gh-pages'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-bump');
  grunt.loadNpmTasks('grunt-release-hoodie');

  grunt.registerTask('test', ['qunit']);
  grunt.registerTask('default', ['watch']);
};
