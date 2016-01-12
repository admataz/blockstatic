/**
 *
 *   Compile a specific json object structure that contains all the page information into a static html page
 *
 *
 *   ```javascript
 *
 *   opts = {
 *   docs: {
 *     id: path.md,
 *     id2: path2.md
 *     …
 *   },
 *   data: {
 *     id: path.json
 *     id2: path2.json
 *     …
 *   },
 *   elements: {
 *     id: {
 *       template: element_template.hbs
 *       data: path.json
 *     },
 *     id2: {
 *       template: element_template2.hbs
 *       data: path2.json
 *     },
 *     …
 *   }
 *   templates:{
 *     page: pagetemplate.hbs,
 *     html: htmltemplate.hbs
 *   }
 
 *   }
 *
 *   ```
 *
 *
 */


"use strict";

var async = require( 'async' );
var loadDataObjectList = require( './loadDataObjectList' );
var loadDocumentList = require( './loadDocumentList' );
var loadJsonElements = require( './loadJsonElements' );
var loadTemplate = require( './loadTemplate' );
var _ = require( 'lodash' );



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
  loadJsonElements( callback );
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



function route( callback ) {
  if ( !opts.route ) {
    return callback();
  }

  callback( null, "/" + opts.route );
}

module.exports = function( opts, cb ) {
  var resultsObj = {
    customBuild,
    elements,
    data,
    docs,
    route
  };
  /**
   * go through the data for a page and put it together into a single results object for outputing the page
   */
  async.parallel( resultsObj,
    // when all the data and content is loaded - combine them into the templates
    function( err, result ) {
      loadTemplate( resultsObj, opts.templates.page, function( err, pageOutput ) {
        resultsObj.pageContent = pageOutput;
        loadTemplate( resultsObj, opts.templates.html, cb );
      } );
    } );
};
