# grunt-inline-template-compile

Replace inline template calls with precompiled template functions. Useful for complying with a strict CSP that doesn't allow `eval` or `new Function(String)`.

![What a stupid hack!](http://i.imgur.com/eCgWfeX.jpg)

## Why use this?

A strict Content-Security-Policy is a *good thing*. The strictest setting supported in the latest browsers completely blocks the use of `eval` in any form.
Unfortunately, many widely-used templating libraries use `eval` or `new Function(String)` internally, making it difficult to comply with a strict CSP, even
if you precompile all your own templates. For example, [backbone-forms](https://github.com/powmedia/backbone-forms) has a few `_.template` calls in its definition
that will make it completely unusable under a strict CSP.

Rather than hack all your vendor libs, `grunt-inline-template-compile` can fix it for you. 

The `inline-template-compile` task turns this:

```javascript
// file src...
var foo = {
  template: _.template('\
    <fieldset data-fields>\
      <% if (legend) { %>\
        <legend>{{ legend }}</legend>\
      <% } %>\
    </fieldset>\
    ', {legend: "foo"}, 
    {
      evaluate: /<%([\s\S]+?)%>/g, 
      interpolate: /{{([\s\S]+?)}}/g, 
      escape: /<%-([\s\S]+?)%>/g
    })
}
// more file src...
```

Into this:

```javascript
// file src...
var foo = {
template: (function (obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '    <fieldset data-fields>      ';
 if (legend) { ;
__p += '        <legend>' +
((__t = ( legend )) == null ? '' : __t) +
'</legend>      ';
 } ;
__p += '    </fieldset>  ';

}
return __p
})({legend: "foo"})
};
// more file src...
```

This prevents the need for `eval` at runtime and makes your boss happy.


## Getting Started
Install this grunt plugin next to your project's [Gruntfile][getting_started] with: `npm install grunt-inline-template-compile`

Then add this line to your project's Gruntfile:

```javascript
grunt.loadNpmTasks('grunt-inline-template-compile');
```

[grunt]: https://github.com/cowboy/grunt
[getting_started]: https://github.com/cowboy/grunt/blob/master/docs/getting_started.md

## Configuration

### Basic configuration

Basic, single file configuration:

```
inline-template-compile : {
  main : {
    src : 'src/main.js',
    dest : 'src/main.compiled.js'
  }
}
```


Multiple files:

```
inline-template-compile : {
  main : {
    expand: true
    cwd: 'src/'
    src : ['*.js'],
    dest : 'dest/'
  }
}
```


#### Default Options

`grunt-inline-template-compile` assumes the use of lodash/underscore, but does not require it. You can specify multiple identifiers to replace
as well as a different template function, if you choose. Below is an example with default options:

```javascript

inline_template_compile : {
  options : {
    // `compileWith` is the template function. Replace with a different one if you're using DoT, etc.
    // expects (tpl, data, options); if your template function does not, wrap it in a transformation function.
    compileWith: require('lodash').template,
    // The search string to look for. It will automatically be parsed into `{member}.{call}`, or `{name}` if there is
    // no owning object.
    // Define multiple compilerNames in an array, e.g. `compilerNames: ['_.template', 'lodash.template', '_l.template']`
    compilerNames: '_.template' 
  },
  ...
```

## How it's done

Parsing is done simply via [node-falafel](https://github.com/substack/node-falafel). The inputted `compilerName` is split, searched for within
the AST, and replaced with a compiled template if possible.

## Limitations

Only inline templates can be properly replaced; if either the template string or the template options are stored in a variable defined elsewhere,
it will not be possible to properly perform the transformation.

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [grunt][grunt].

## Release History

- 0.1.1 Add proper loc reference to error message.
- 0.1.0 Initial release. 


## License
Copyright (c) 2014 Samuel Reed  
Licensed under the MIT license.
