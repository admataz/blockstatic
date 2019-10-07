/**
 * generates an jsonFeed file for a directory containing content
 *
 * requires a content path, filename being indexed, a doc object with data to be indexed
 *
 */
var _ = require('lodash');
var buildList = require('./buildList');
var loadDocumentList = require('./loadDocumentList');

var template = require('./jsonFeedTemplate');

module.exports = function(inputPath, outputPath, siteoptions, cb) {
  if (!inputPath) {
    return cb(new Error('No input path provided'));
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
      var docs2 = _.filter(Object.keys(docs), (itm) => {
        return docs[itm];
      });
      var docsListIndex = _.map(docs2, (itm) => {
        return {
          path: outputPath + '/' + itm,
          meta: docs[itm].meta,
          html: docs[itm].html
        };
      });
      docsListIndex = _.orderBy(docsListIndex, 'meta.date').reverse();
      template(docsListIndex, siteoptions, (err, jsonfeed) => {
        if(err){
          return cb(err);
        }
        cb(null, jsonfeed);
      });
      // cb(null, docsListIndex);
    });

  });

};