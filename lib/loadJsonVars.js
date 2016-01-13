/**
 * load a json file and turn it into a javascript object - merge with  a global object if specified
 *
 * TODO: decouple the global object functionality - make it an option set outside of this function
 */
var jf = require('jsonfile');
module.exports = function(path, cb) {
  if (!path) {
    return cb(new Error('The file name was not supplied'));
  }
  jf.readFile(path, function(err, obj) {
    if (err) {
      return cb(err);
    }
    cb(err, obj);
  });
};