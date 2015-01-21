
var duplexer = require('duplexer');
var through = require('through');

module.exports = function (counter) {
  var c = {};
  var countries = through(function (o) {
    c[o.country] = (c[o.country] || 0) + 1;
  },
  function () {
    counter.setCounts(c);
  });

  return duplexer(countries, counter);
}