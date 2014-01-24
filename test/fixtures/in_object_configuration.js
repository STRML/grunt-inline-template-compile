var _ = require('lodash');

var settings = {
	evaluate: /<%([\s\S]+?)%>/g, 
	interpolate: /<%=([\s\S]+?)%>/g, 
	escape: /<%-([\s\S]+?)%>/g
};

// from backbone-forms
var foo = {
  //STATICS
  template: _.template('\
    <fieldset data-fields>\
      <% if (legend) { %>\
        <legend><%= legend %></legend>\
      <% } %>\
    </fieldset>\
  ', {legend: "foo"}, settings)
};