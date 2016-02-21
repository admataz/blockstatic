/**
 * compile articles html from specific directory of markdown files
 */
var fs = require('fs');
var path = require('path');
var async = require('async');
var jf = require('jsonfile');
var _ = require('lodash');

function buildPage(file, cb) {
  var options = {};
  var ext = path.extname(file);

  if (ext == '.md') {
    options.routePath = path.basename(file, '.md');
    options.docs = {
      page: file
    };
    return cb(null, options);
  }

  // it's expected that this json is the correct format for compilePage
  if (ext == '.json') {
    jf.readFile(file, (err, obj) => {
      if (err) {
        return cb(err);
      }
      return cb(null, obj);
    });


  } else if (ext == '.js') {
    // TODO:10 a pure JS implementation of page generation
    return cb(null, {});


  } else {
    // unsupported file type - fail silently
    return cb(null, null);
  }
}

module.exports = function(inputDir, cb) {
  // read the directory containing the markdown
  fs.readdir(inputDir, (err, files) => {
    if (err) {
      return cb(err);
    }

    files = _.map(files, (f) => {
      return inputDir + '/' + f;
    });

    // for each file - do the compilation
    async.map(files, buildPage, (err, results) => {
      results = _.filter(results);
      return cb(err, results);
    });
  });
};
