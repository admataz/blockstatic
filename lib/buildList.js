/**
 * compile  html from specific directory of markdown files
 */
var fs = require('fs');
var path = require('path');
var async = require('async');
var jf = require('jsonfile');
var _ = require('lodash');
var loadDocument = require('./loadDocument');

function buildPage(file, cb) {
  var options = {};
  var ext = path.extname(file);

  if (ext == '.md') {
    loadDocument(file, (err, docobject) => {
      if(err){
        return cb(err);
      }
      if(docobject.meta && docobject.meta.published){
        options.routePath = path.basename(file, '.md');
        options.docs = {
          page: file
        };
        return cb(null, options);
      }
      return cb(null, null);
    });



  }else if (ext == '.json') {
    // it's expected that this json is the correct format for compilePage
    jf.readFile(file, (err, obj) => {
      if (err) {
        return cb(err);
      }
      return cb(null, obj);
    });


  } else if (ext == '.js') {
    // TODO:10 a pure JS implementation of page generation
    return cb(null, null);


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
