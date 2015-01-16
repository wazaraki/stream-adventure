
var concat = require('concat-stream');

process.stdin
  .pipe(concat(function (buf) {
    if (!buf) process.stdout.write('');
    process.stdout.write(buf.toString().split('').reverse().join(''));
  }));