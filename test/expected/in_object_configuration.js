var _ = require('lodash');

var settings = {
	evaluate: /<%([\s\S]+?)%>/g, 
	interpolate: /<%=([\s\S]+?)%>/g, 
	escape: /<%-([\s\S]+?)%>/g
};

// from backbone-forms
var foo = {
  //STATICS
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