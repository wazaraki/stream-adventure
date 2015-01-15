
var through = require('through');
var toUpper = through(function (buf) {
  this.queue(buf.toString().toUpperCase());
});

process.stdin.pipe(toUpper).pipe(process.stdout);
