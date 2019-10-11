/**
 * convert supplied list of json data items into an object containing compiled html for each keyed value
 */
var async = require('async');
var indexPages = require('./indexPages');
var loadTemplate = require('./loadTemplate');
module.exports = function(els, cb) {
  var results = {};
  async.each(Object.keys(els), (key, cb) => {
    var outputPath = key;
    var limit = els[key].limit || 0;
    if (els[key].outputPath) {
      outputPath = els[key].outputPath;
    }
    
    indexPages(els[key].inputPath, outputPath, limit, (err, pages) => {
      loadTemplate({docs:pages}, els[key].template, (err, compiled) => {
        results[key] = compiled;
        cb();
      });
    });
  }, (err) => {
    return cb(err, results);
  });
};
