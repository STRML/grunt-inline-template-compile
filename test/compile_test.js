"use strict";

var grunt = require('grunt');

/*
 ======== A Handy Little Nodeunit Reference ========
 https://github.com/caolan/nodeunit

 Test methods:
 test.expect(numAssertions)
 test.done()
 Test assertions:
 test.ok(value, [message])
 test.equal(actual, expected, [message])
 test.notEqual(actual, expected, [message])
 test.deepEqual(actual, expected, [message])
 test.notDeepEqual(actual, expected, [message])
 test.strictEqual(actual, expected, [message])
 test.notStrictEqual(actual, expected, [message])
 test.throws(block, [error], [message])
 test.doesNotThrow(block, [error], [message])
 test.ifError(value)
 */

var helpers = require('../tasks/helpers');

var files = [
  'in_object_configuration.js',
];

exports['inline-template-compile'] = {
  setUp: function(done) {
    // setup here
    done();
  },
  inline : function(test) {

    var actualDir = 'tmp/inline/',
      expectedDir = 'test/expected/';

    test.expect(files.length);

    files.forEach(function(file){
      var actual = grunt.file.read(actualDir + file);
      var expected = grunt.file.read(expectedDir + file);
      test.equals(actual,expected, file + " should be the same");
    });

    test.done();
  },
  multi : function(test) {

    var actualDir = 'tmp/',
        expectedDir = 'test/expected/';

    test.expect(files.length);

    files.forEach(function(file){
      var actual = grunt.file.read(actualDir + file);
      var expected = grunt.file.read(expectedDir + file);
      test.equals(actual,expected, file + " should be the same");
    });

    test.done();
  }
};


