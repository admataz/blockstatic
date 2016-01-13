
var fs = require('fs');
var loadDocument = require('../../../lib/loadDocument');
var loadTemplate = require('../../../lib/loadTemplate');
var path = require('path');
var async = require('async');
var _ = require('lodash');


module.exports = function(cb) {
  var pageOptions = {};
  fs.readdir('./src/content/articles', function(err, files) {
    if (err) {
      return cb(err);
    }
    var docs = [];
    // get a list of markdown files
    async.eachSeries(files, function(itm, callback) {
      if (path.extname(itm) === ".md") {
        loadDocument('./src/content/articles/' + itm, function(err, result) {
          if (err) {
            return cb(err);
          }
          if (result.meta.published) {
            result.meta.path = path.basename(itm, '.md');
            docs.push(result);
          }
          callback();
        });
      }
    }, function(err) {

      docs = _.sortBy(docs, function(itm) {
        return -(new Date(itm.meta.date));
      });
      loadTemplate({
        docs: docs
      }, './src/templates/elements/articles_list.handlebars', function(err, compiled) {
        pageOptions.prerendered = {
          article_list: compiled
        };
        return cb(err, pageOptions);
      });
    });
  });
};