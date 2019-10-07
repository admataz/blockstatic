/**
 * generate static html for all pages
 */
var fs = require('fs');
var path = require('path');
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
    async.eachSeries(
      pagelist,
      (pageOptions, callback) => {
        pageOptions = _.merge({}, options, pageOptions, {outputDir});
        compilePage(pageOptions, function(err, result) {
          if (err) {
            return err;
          }
          if (pageOptions.routePath === null) {
            return callback();
          }
          var pageOutputDir = outputDir + '/' + pageOptions.routePath;
          writeHtmlPage(
            pageOutputDir,
            result,
            function(err, result) {
              if(err){
                return err;
              }
              
              // TODO: make this assets copying section a separate file
              if(pageOptions.js && pageOptions.js.length){
                if(!fs.existsSync(pageOutputDir + '/js')) {
                  fs.mkdirSync(pageOutputDir + '/js');
                }
                pageOptions.js.map(f => fs.copyFileSync(f, pageOutputDir + '/js/' + path.basename(f)));
              }
              
              if(pageOptions.css && pageOptions.css.length){
                if(!fs.existsSync(pageOutputDir + '/css')) {
                  fs.mkdirSync(pageOutputDir + '/css');
                }
                pageOptions.css.map(f => fs.copyFileSync(f, pageOutputDir + '/css/' + path.basename(f)));
              }
              
              if(pageOptions.assets && pageOptions.assets.length){
                if(!fs.existsSync(pageOutputDir + '/assets')) {
                  fs.mkdirSync(pageOutputDir + '/assets');
                }
                pageOptions.assets.map(f => fs.copyFileSync(f, pageOutputDir + '/assets/' + path.basename(f)));
              }
              
              callback();
            }
          );
        });
      },
      err => {
        return cb(err, _.map(pagelist, 'routePath'));
      }
    );
  });
};
