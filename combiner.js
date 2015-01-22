
var combiner = require('stream-combiner');
var split = require('split');
var through = require('through');
var zlib = require('zlib');

module.exports = function () {
  var genres = [];

  return combiner(split(), through(write), zlib.createGzip());

  function write (obj) {
    if (!obj.toString()) {
      return this.queue(genres.map(JSON.stringify).join('\n') + '\n');
    }
    obj = JSON.parse(obj);
    if (obj.type === 'genre') {
      return genres.push({name: obj.name, books: []});
    }
    genres[genres.length - 1].books.push(obj.name);
  }
}