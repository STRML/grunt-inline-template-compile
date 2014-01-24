var _ = require('lodash');

_.template('\
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
  }
);