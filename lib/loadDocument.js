/**
 * Load a markdown file, and turn it into html+metadata
 */
var fs = require('fs');
var metaMarked = require('meta-marked');
module.exports = function(contentPath, cb) {
  if (!contentPath) {
    return cb(new Error('no content page supplied for converting markdown'));
  }
  fs.exists(contentPath, function(exists) {
    if (!exists) {
      return cb(new Error('the markdown content page supplied "' + contentPath + '" does not exist on the system'));
    }
    fs.readFile(contentPath, {
      encoding: 'utf8'
    }, function(err, obj) {
      if (err) {
        return cb(err);
      }
      cb(err, metaMarked(obj));
    });
  });
};