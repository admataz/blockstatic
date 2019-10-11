/**
 *
 *   Compile a specific json object structure that contains all the page information into a static html page
 *
 *
 *   ```javascript
 *  var opts = {
 *   routePath: "url/path",
 *   docs: { docID: "path/to/file.md" }
 *   data: { dataID: "path/to/file.json" }
 *   elements: { elementID: { template: "path/to/element_template.handlebars", data: "path/to/data.json"}}
 *   templates: { page: "path/to/template.handlebars", html: "path/to/template.handlebars" }
 *   customBuild: "path/to/node/module",
 *   indexPages: { indexId: {inputPath: "path/to/pages", template: "path/to/template.handlebars", outputPath: "optional/path/to/output/defaults/to/container/page"}}
 *   js: ["path/to/script.js"],
 *   css: ["path/to/style.css"],
 *   assets: ["path/to/assets"]
 * }
 *
 *  TODO:
 *  allow sass in above?
 *
 */

'use strict';
var path = require('path');
var async = require('async');
var loadDataObjectList = require('./loadDataObjectList');
var loadDocumentList = require('./loadDocumentList');
var loadJsonElements = require('./loadJsonElements');
var loadPageIndexList = require('./loadPageIndexList');
var opts;

function customBuild(callback) {
  var custom;
  if (!opts.customBuild) {
    return callback();
  }
  custom = require(`${process.cwd()}/${opts.customBuild}`);
  custom(callback);
}

function indexPages(callback) {
  if (!opts.indexPages) {
    return callback();
  }
  loadPageIndexList(opts.indexPages, callback);
}

function elements(callback) {
  if (!opts.elements) {
    return callback();
  }
  loadJsonElements(opts.elements, callback);
}

function data(callback) {
  if (!opts.data) {
    return callback();
  }
  loadDataObjectList(opts.data, callback);
}

function docs(callback) {
  if (!opts.docs) {
    return callback();
  }
  loadDocumentList(opts.docs, callback);
}

function routePath(callback) {
  if (!opts.routePath) {
    return callback();
  }
  callback(null, (opts.baseUrl || '') + '/' + opts.routePath);
}

function scripts(callback) {
  if (!opts.js) {
    return callback();
  }
  callback(
    null,
    opts.js.map(
      f =>
        (opts.baseUrl || '') + '/' + opts.routePath + '/js/' + path.basename(f)
    )
  );
}

function styles(callback) {
  if (!opts.css) {
    return callback();
  }
  callback(
    null,
    opts.css.map(
      f =>
        (opts.baseUrl || '') + '/' + opts.routePath + '/css/' + path.basename(f)
    )
  );
}

function assets(callback) {
  if (!opts.assets) {
    return callback();
  }
  callback(
    null,
    opts.assets.map(
      f =>
        (opts.baseUrl || '') +
        '/' +
        opts.routePath +
        '/assets/' +
        path.basename(f)
    )
  );
}


function img(callback) {
  if (!opts.img) {
    return callback();
  }
  callback(
    null,
    opts.img.map(
      f =>
        (opts.baseUrl || '') +
        '/' +
        opts.routePath +
        '/img/' +
        path.basename(f)
    )
  );
}

function compilePage(o, cb) {
  var resultsObj = {
    customBuild,
    elements,
    data,
    docs,
    indexPages,
    routePath,
    scripts,
    styles,
    assets,
    img
  };

  opts = o;
  /**
   * go through the data for a page and put it together into a single results object for outputing the page
   */
  async.parallel(resultsObj, (err, result) => {
    cb(err, {result, opts});
  });
}

compilePage.img = img;

module.exports = compilePage;
