/*
 * grunt-inline-template-compile
 * https://github.com/STRML/grunt-inline-template-compile
 *
 * Copyright (c) 2014 Samuel Reed
 * Licensed under the MIT license.
 */

'use strict';

var transformer = require('./helpers').transformer;
var _ = require('lodash');

module.exports = function(grunt) {

  grunt.registerMultiTask('inline_template_compile', 'Compile templates deep inside any JS source.', function() {
    var nodes = ['console'];

    var options = _.defaults(this.options(), {
      compileWith: _.template,
      compilerNames: ['_.template']
    });

    // Make sure these are arrays
    options.compilerNames = _.flatten([options.compilerNames || 
      options.compilerName /* who knows, somebody might get confused */]);

    // Errors
    if (!_.isFunction(options.compileWith)){
      grunt.log.error('`options.compileWith` must be defined and a function accepting (string, data, options).');
      return;
    }
    if (!options.compilerNames.length){
      grunt.log.error('At least one compiler function name must be specified! See the README.');
      return;
    }

    this.files.forEach(function(fileObj){
      if (!fileObj.dest) {
        if (!options.inline) {
          grunt.log.error('WARNING : POTENTIAL CODE LOSS.'.yellow);
          grunt.log.error('You must specify "inline : true" when using the "files" configuration.');
          grunt.log.errorlns(
            'This WILL REWRITE FILES WITHOUT MAKING BACKUPS. Make sure your ' +
              'code is checked in or you are configured to operate on a copied directory.'
          );
          return;
        }
        fileObj.src.forEach(function(srcFileName) {
          transformSource(srcFileName, srcFileName, options);
        });
      } else {
        var srcFileName = fileObj.src[0],
          destFileName = fileObj.dest;
        transformSource(srcFileName, destFileName, options);
      }
    });
  });

  function transformSource(srcFileName, destFileName, options) {
    var src = grunt.file.read(srcFileName),
      output = transformer(src, srcFileName, options);

    return grunt.file.write(destFileName, output);
  }

};
