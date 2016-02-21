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
 *   js: ["path/to/script.js"],
 *   css: ["path/to/style.css"]
 * }
 *
 *  TODO:
 *  allow sass in above?
 *
 */


'use strict';

var async = require( 'async' );
var _ = require('lodash');
var loadDataObjectList = require( './loadDataObjectList' );
var loadDocumentList = require( './loadDocumentList' );
var loadJsonElements = require( './loadJsonElements' );
var loadTemplate = require( './loadTemplate' );
var opts;


function customBuild( callback ) {
  var custom;
  if ( !opts.customBuild ) {
    return callback();
  }
  custom = require( opts.customBuild );
  custom( callback );
}



function elements( callback ) {
  if ( !opts.elements ) {
    return callback();
  }
  loadJsonElements( opts.elements, callback );
}

function data( callback ) {
  if ( !opts.data ) {
    return callback();
  }
  loadDataObjectList( opts.data, callback );
}

function docs( callback ) {
  if ( !opts.docs ) {
    return callback();
  }
  loadDocumentList( opts.docs, callback );
}

function routePath( callback ) {
  if ( !opts.routePath ) {
    return callback();
  }
  callback( null, '/' + opts.routePath );
}



module.exports = function( o, cb ) {

  var resultsObj = {
    customBuild,
    elements,
    data,
    docs,
    routePath
  };

  opts = o;
  /**
   * go through the data for a page and put it together into a single results object for outputing the page
   */
  async.parallel(
    resultsObj,
    (err, result) => {

      if(!opts.templates || !opts.templates.page || !opts.templates.html){
        return cb(new Error('No Template supplied'));
      }


      loadTemplate( result, opts.templates.page, ( err, pageOutput ) =>  {
        result.pageContent = pageOutput;
        // console.log(result );
        loadTemplate( result, opts.templates.html, cb );
      } );
    }
    );
};
