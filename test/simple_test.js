'use strict';

var fs = require('fs');
var _ = require('lodash');

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

var transform = function(src, fileName){
  return require('../tasks/helpers').transformer(src, fileName, {
    compileWith: _.template.bind(_),
    compilerNames: ['_.template']
  });
};

var files = fs.readdirSync('test/fixtures').filter(function(element, index, array){
    return element.match(/^.+\.js$/) && !element.match(/^index\.js/) && !element.match(/^\./) && !element.match(/^\#/);
});

exports['simple_test'] = {
  transform: function(test) {
    var fixtureDir = 'test/fixtures/',
      expectedDir = 'test/expected/';

    test.expect(files.length);

    files.forEach(function(file){
      var fixture = fs.readFileSync(fixtureDir + file).toString();
      var expected = fs.readFileSync(expectedDir + file).toString().replace(/\s/g, '');
      var transformed = transform(fixture, file);
      test.equals(transform(fixture, file).replace(/\s/g, ''), expected, file + " should be the same");
    });
    test.done();
  }
};