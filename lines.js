
var split = require('split');
var through = require('through');
var odd = true;

var interCaps = function (lines) {
  lines = odd
    ? lines.toString().toLowerCase()
    : lines.toString().toUpperCase();
  odd = !odd;
  this.queue(lines + '\n');
}

process.stdin
  .pipe(split())
  .pipe(through(interCaps))
  .pipe(process.stdout);