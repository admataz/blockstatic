/**
 * creates an index.html file within a specified path containing the supplied contents
 */


var fs = require('fs');
var mkdirp = require('mkdirp');

module.exports = function(dest, filecontents, cb) {
  if (!dest) {
    return cb(new Error('You must provide the destination of the HTML file to be written'));
  }
  if (!filecontents) {
    // Don't throw an error - just make it an empty file. 
    filecontents = '';
  }
  mkdirp(dest, function(err, made) {
    if (err) {
      return cb(err);
    }
    fs.writeFile(dest + '/index.html', filecontents, function(err) {
      if (err) {
        return cb(err);
      }
      cb(err, dest + '/index.html');
    });
  });
};