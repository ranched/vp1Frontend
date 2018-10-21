module.exports = function(grunt) {
 
  require('load-grunt-tasks')(grunt);
 
 
  grunt.initConfig({
    compress: {
      main: {
        options: {
          archive: 'build.zip',
          pretty: true
        },
        expand: true,
        cwd: './',
        src: ['./build/**/*'],
        dest: './dist/'
      }
    }
  });
 
  grunt.registerTask('default', ['compress']);
};