/**
 * generates an index.json for a directory containing content
 *
 * requires a content path, filename being indexed, a doc object with data to be indexed
 * TODO:30 make the required elements their own parameters 
 * 
 */
var fs = require( 'fs' );
var jf = require( 'jsonfile' );
var _ = require( 'lodash' );
var path = require( 'path' );
var options = {};
var rimraf = require( 'rimraf' );
var defaults = {
  systemPath: './build/',
  contentPath: 'articles/'
};



function onContentLoaded( err, data ) {

}


module.exports = function( contentPath, fileName, doc, opts, cb ) {
  var indexData = [];


  if ( !opts ) {
    opts = {};
  }



  options = _.extend( defaults, opts );

  // contentPath is the path to the compiled content
  if ( !contentPath ) {
    return cb( new Error( 'you must provide a valid path to content' ) );
  }
  // fileName is the name of the page in the contentpath
  if ( !fileName ) {
    return cb( new Error( 'you must provide a valid filename to content' ) );
  }
  // doc is the document object containing indexable data
  if ( !doc ) {
    return cb( new Error( 'you must provide  data to index content' ) );
  }

  // if (fs.existsSync(options.systemPath + contentPath + 'index.json')) {
  //   indexData = jf.readFileSync(options.systemPath+options.contentPath + 'index.json');
  // } else {
  //   indexData = [];
  // }


// read in the existing index.json file - if it doesn't exist or there's an error - set the data to an empty array
  jf.readFile( options.systemPath + options.contentPath + 'index.json', ( err, jsonresult ) => {
    if ( err ) {
      indexData = [];
    }



  } );


  options.doc.meta.path = path.relative( options.systemPath + contentPath, path.dirname( fileName ) );


  if ( !options.doc.meta.published && fs.existsSync( fileName ) ) {
    return cb( rimraf.sync( path.dirname( options.fileName ) ) );
  }

  indexData.push( options.doc.meta );

  indexData = _.filter( indexData, function() {
    return fs.existsSync( options.fileName );
  } );

  indexData = _.filter( indexData, function( itm, i ) {
    return itm.published;
  } );

  indexData = _.sortBy( indexData, function( itm ) {
    return -( new Date( itm.date ) );
  } );
  jf.writeFileSync( options.systemPath + options.contentPath + 'index.json', indexData );
  cb();
};
