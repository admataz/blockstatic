/**
 * generate static html for all pages
 */
var fs = require('fs');
var path = require('path');
var async = require('async');

var _ = require('lodash');
var buildList = require('./buildList');
var compilePage = require('./compilePage');
var loadTemplate = require('./loadTemplate');
var writeHtmlPage = require('./writeHtmlPage');

// function compileTemplates

// function writeFiles

module.exports = function(inputDir, outputDir, options, cb) {
  var combinedOptions;
  if (typeof options === 'function') {
    cb = options;
    options = {};
  }

  buildList(inputDir, (err, pagelist) => {
    async.eachSeries(
      pagelist,
      (pageOptions, callback) => {
        combinedOptions = _.merge({}, options, pageOptions, { outputDir });
        compilePage(combinedOptions, (err, { result, opts }) => {
          if (!opts.templates || !opts.templates.page || !opts.templates.html) {
            return cb(new Error('No Template supplied'));
          }
          loadTemplate(result, opts.templates.page, (err, pageOutput) => {
            result.pageContent = pageOutput;
            loadTemplate(result, opts.templates.html, (err, result) => {
              if (combinedOptions.routePath === null) {
                return callback();
              }
              var pageOutputDir = outputDir + '/' + combinedOptions.routePath;
              writeHtmlPage(pageOutputDir, result, function(err, result) {
                if (err) {
                  return err;
                }

                // TODO: make this assets copying section a separate file
                if (combinedOptions.js && combinedOptions.js.length) {
                  if (!fs.existsSync(pageOutputDir + '/js')) {
                    fs.mkdirSync(pageOutputDir + '/js');
                  }
                  combinedOptions.js.map(f =>
                    fs.copyFileSync(
                      f,
                      pageOutputDir + '/js/' + path.basename(f)
                    )
                  );
                }

                if (combinedOptions.css && combinedOptions.css.length) {
                  if (!fs.existsSync(pageOutputDir + '/css')) {
                    fs.mkdirSync(pageOutputDir + '/css');
                  }
                  combinedOptions.css.map(f =>
                    fs.copyFileSync(
                      f,
                      pageOutputDir + '/css/' + path.basename(f)
                    )
                  );
                }

                if (combinedOptions.assets && combinedOptions.assets.length) {
                  if (!fs.existsSync(pageOutputDir + '/assets')) {
                    fs.mkdirSync(pageOutputDir + '/assets');
                  }
                  combinedOptions.assets.map(f =>
                    fs.copyFileSync(
                      f,
                      pageOutputDir + '/assets/' + path.basename(f)
                    )
                  );
                }

                if (combinedOptions.img && combinedOptions.img.length) {
                  if (!fs.existsSync(pageOutputDir + '/img')) {
                    fs.mkdirSync(pageOutputDir + '/img');
                  }
                  combinedOptions.img.map(f =>
                    fs.copyFileSync(
                      f,
                      pageOutputDir + '/img/' + path.basename(f)
                    )
                  );
                }

                callback();
              });
            });
          });
        });
      },
      err => {
        return cb(err, _.map(pagelist, 'routePath'));
      }
    );
  });
};
