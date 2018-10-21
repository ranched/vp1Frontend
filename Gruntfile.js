module.exports = function(grunt) {
 
  require('load-grunt-tasks')(grunt);
 
 
  grunt.initConfig({
    compress: {
      main: {
        options: {
          archive: 'dist/build.zip',
        },
        expand: true,
        cwd: 'build/',
        src: '**/*'
      }
    }
  });
 
  grunt.registerTask('default', ['compress']);
};