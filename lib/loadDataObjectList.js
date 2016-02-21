/**
 * get a list/object of json document paths and turn them into a compiled objects
 */
var async = require('async');
var loadJsonVars = require('./loadJsonVars');
module.exports = function loadDataObjectList(docs, cb) {
  var results = {};
  // loop through all the items in the object (via the keys)
  async.each(Object.keys(docs), (key, cb) =>  {
    // load the json from file
    loadJsonVars(docs[key], (err, jsonobject) =>  {
      results[key] = jsonobject;
      cb(err);
    });
  }, (err) => {
    return cb(err, results);
  });
};
