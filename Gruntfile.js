'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    nodeunit: {
      files: ['test/**/*test.js']
    },
    clean : {
      tmp : ['tmp']
    },
    copy: {
      all : {
        files: [
          {expand: true, src: ['**'], dest: 'tmp/inline/', cwd: 'test/fixtures/'}
        ]
      }
    },
    inline_template_compile : {
      options : {
        // expects tpl, data, options; if your template function does not, wrap it in a function.
        compileWith: require('lodash').template,
        compilerName: '_.template'
        // optional: compilerNames: ['_.template', 'lodash.template', '_l.template']
      },
      all : {
        expand: true,
        cwd: 'test/fixtures',
        src: ['*.js'],
        dest: 'tmp/'
      },
      inline : {
        src : ['tmp/inline/*.js'],
        options : {
          inline : true
        }
      }
    },
    jshint: {
      options : {
        jshintrc : './.jshintrc'
      },
      all : ['Gruntfile.js', 'tasks/**/*.js']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-clean');

  // Load local tasks.
  grunt.loadTasks('tasks');

  // Default task.
  grunt.registerTask('default', ['jshint','clean','copy','inline_template_compile','nodeunit']);
};
