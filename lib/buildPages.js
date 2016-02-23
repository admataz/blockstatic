/**
 * generate static html for all pages
 */
var async = require('async');
var _ = require('lodash');
var buildList = require('./buildList');
var compilePage = require('./compilePage');
var writeHtmlPage = require('./writeHtmlPage');


module.exports = function(inputDir, outputDir, options, cb) {
  if (typeof options === 'function') {
    cb = options;
    options = {};
  }

  buildList(inputDir, (err, pagelist) => {
    async.eachSeries(pagelist, (pageOptions, callback) => {
      pageOptions = _.merge({}, options, pageOptions);
      compilePage(pageOptions, function(err, result) {
        // console.log(pageOptions);
        if (err) {
          return err;
        }
        writeHtmlPage(outputDir + '/' + pageOptions.routePath, result, function(err, result) {
          callback();
        });
      });
    }, (err) => {
      return cb(err, _.map(pagelist, 'routePath'));
    });
  });

};
