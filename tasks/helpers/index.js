var falafel = require('falafel');
var _ = require('lodash');

exports.transformer = function(src, fileName, options) {
  "use strict";

  var members = [];
  var calls = [];
  var names = [];

  _.each(options.compilerNames, function(compilerName){
    var split = compilerName.split(".");
    if (split.length === 2){
      members.push(split[0]);
      calls.push(split[1]);
    } else {
      names.push(compilerName);
    }
  });

  var output = falafel(src, {loc: true}, function(node){
    if (node.type !== 'CallExpression') return;

    // Attempt to match.
    var match = false;
    if (node.callee.object && node.callee.property && 
        members.indexOf(node.callee.object.name) !== -1 && 
        calls.indexOf(node.callee.property.name) !== -1) match = true;
    else if (names.indexOf(node.callee.name) !== -1) match = true;
    if (!match) return;

    // Ready to go, let's compile
    var src = node.arguments[0].value;
    if (typeof src !== 'string'){
      throw new Error("Can't translate invalid template call: " + fileName + ": " + JSON.stringify(node.loc));
    }

    // Hold on to data, we'll feed it into the generated function
    var data;
    if (node.arguments[1].type === "ObjectExpression"){
      data = node.arguments[1].source();
    }
    
    var compileOptions;
    if (node.arguments[2].type === "ObjectExpression"){
      compileOptions = node.arguments[2].source();
    }

    // Create the compiled template - most templating libraries will do this with null data.
    /*jshint evil: true */
    var compiledTemplate = options.compileWith(src, null, compileOptions ? eval('(' + compileOptions + ')') : null);

    // Replace the template call with a call to the compiled template with the given data.
    if (!_.isString(data)){
      node.update(compiledTemplate); // no data was provided, so just return the compiled tpl function
    } else {
      node.update('(' + compiledTemplate + ')(' + data + ')');
    }
  });

  return output.toString();
};

