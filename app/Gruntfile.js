module.exports = function(grunt) {
 
  require('load-grunt-tasks')(grunt);
 
 
  grunt.initConfig({
    compress: {
      main: {
        options: {
          archive: 'artifact.zip',
          pretty: true
        },
        expand: true,
        cwd: './',
        src: ['./build/**/*'],
        dest: './'
      }
    }
  });
 
  grunt.registerTask('default', ['compress']);
};