module.exports = function(grunt) {
 
  require('load-grunt-tasks')(grunt);
 
 
  grunt.initConfig({
    compress: {
      main: {
        options: {
          archive: 'build.zip',
        },
        expand: true,
        cwd: 'build/',
        src: ['**/*'],
        dest: 'dist/'
      }
    }
  });
 
  grunt.registerTask('default', ['compress']);
};