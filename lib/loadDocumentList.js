/**
 * Load a supplied list of documents into a results object with html for each keyed value 
 */
var async = require('async');
var loadDocument = require('./loadDocument');
module.exports = function loadDocs(docs, cb) {
  var results = {};
  // loop through all the items in the object (via the keys)
  async.each(Object.keys(docs), function(key, cb) {
    // load the document
    loadDocument(docs[key], function(err, docobject) {
      if(err){
        return cb(err);
      }

      if(docobject.meta && docobject.meta.published){
        results[key] = docobject;
      }
      cb();
    });
  }, function(err) {
    return cb(err, results);
  });
};