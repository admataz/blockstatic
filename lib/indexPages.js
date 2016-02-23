/**
 * generates an index.json for a directory containing content
 *
 * requires a content path, filename being indexed, a doc object with data to be indexed
 * TODO:30 make the required elements their own parameters
 *
 */
var _ = require('lodash');
var buildList = require('./buildList');
var loadDocumentList = require('./loadDocumentList');

module.exports = function(inputPath, outputPath, cb) {

  // console.log(outputPath);
  // return;

  if(!inputPath){
    return cb(new Error('No input path provided'));
  }

  if(!outputPath){
    return cb(new Error('No output path provided'));
  }

  buildList(inputPath, (err, docsList) => {
    if (err) {
      return cb(err);
    }
    var docsObj = {};
    docsList = _.each(docsList, (doc) => {
      docsObj[doc.routePath] = doc.docs.page;
    });

    loadDocumentList(docsObj, (err, docs) => {
      if (err) {
        return cb(err);
      }
      var docsListIndex = _.map(Object.keys(docs), (itm) => {
        return {
          path: outputPath + '/' + itm,
          meta: docs[itm].meta
        };
      });
      cb(null, docsListIndex);
    });

  });

};

//
// var fs = require( 'fs' );
// var jf = require( 'jsonfile' );
// var _ = require( 'lodash' );
// var path = require( 'path' );
// var options = {};
// var rimraf = require( 'rimraf' );
//
//
//
//
//
// module.exports = function( contentPath, fileName, doc, opts, cb ) {
//   var indexData = [];
//
//
//   if ( !opts ) {
//     opts = {};
//   }
//
//
//
//   options = _.extend( defaults, opts );
//
//   // contentPath is the path to the compiled content
//   if ( !contentPath ) {
//     return cb( new Error( 'you must provide a valid path to content' ) );
//   }
//   // fileName is the name of the page in the contentpath
//   if ( !fileName ) {
//     return cb( new Error( 'you must provide a valid filename to content' ) );
//   }
//   // doc is the document object containing indexable data
//   if ( !doc ) {
//     return cb( new Error( 'you must provide  data to index content' ) );
//   }
//
//
//
// // read in the existing index.json file - if it doesn't exist or there's an error - set the data to an empty array
//   jf.readFile( options.systemPath + options.contentPath + 'index.json', ( err, jsonresult ) => {
//     if ( err ) {
//       indexData = [];
//     }
//
//
//
//   } );
//
//
//   options.doc.meta.path = path.relative( options.systemPath + contentPath, path.dirname( fileName ) );
//
//
//   if ( !options.doc.meta.published && fs.existsSync( fileName ) ) {
//     return cb( rimraf.sync( path.dirname( options.fileName ) ) );
//   }
//
//   indexData.push( options.doc.meta );
//
//   indexData = _.filter( indexData, function() {
//     return fs.existsSync( options.fileName );
//   } );
//
//   indexData = _.filter( indexData, function( itm, i ) {
//     return itm.published;
//   } );
//
//   indexData = _.sortBy( indexData, function( itm ) {
//     return -( new Date( itm.date ) );
//   } );
//   jf.writeFileSync( options.systemPath + options.contentPath + 'index.json', indexData );
//   cb();
// };
