
var through = require('through');
var zlib = require('zlib');
var crypto = require('crypto');
var tar = require('tar');

var decipher = crypto.createDecipher(process.argv[2], process.argv[3]);
var gunzip = zlib.createGunzip();

var parser = tar.Parse();

parser.on('entry', function (e) {
  if (e.type !== 'File') return;
  var filename = e.path;
  var md5 = crypto.createHash('md5', {encoding:'hex'});
  e.pipe(md5)
   .pipe(through(function (buf) {
     console.log(buf.toString() + ' ' + filename);
   }));
});

process.stdin
  .pipe(decipher)
  .pipe(gunzip)
  .pipe(parser)