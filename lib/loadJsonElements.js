/**
 * convert supplied list of json data items into an object containing compiled html for each keyed value
 */
var async = require('async');
var loadJsonVars = require('./loadJsonVars');
var loadTemplate = require('./loadTemplate');
module.exports = function loadJsonElements(els, cb) {
  var results = {};
  async.each(Object.keys(els), function(key, cb) {
    loadJsonVars(els[key].data, false, function(err, jsonobject) {
      loadTemplate(jsonobject, els[key].template, function(err, compiled) {
        results[key] = compiled;
        cb();
      });
    });
  }, function(err) {
    return cb(err, results);
  });
};