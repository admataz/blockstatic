/**
 * generates an index for a directory containing content
 *
 * requires a content path, filename being indexed, a doc object with data to be indexed
 *
 */
var _ = require('lodash');
var buildList = require('./buildList');
var loadDocumentList = require('./loadDocumentList');

module.exports = function(inputPath, baseUrl, limit, cb) {
  if (!inputPath) {
    return cb(new Error('No input path provided'));
  }

  buildList(inputPath, (err, docsList) => {
    if (err) {
      return cb(err);
    }
    var docsObj = {};
    docsList = _.each(docsList, doc => {
      docsObj[doc.routePath] = doc.docs.page;
    });

    loadDocumentList(docsObj, (err, docs) => {
      var output = [];
      if (err) {
        return cb(err);
      }
      var docs2 = _.filter(Object.keys(docs), itm => {
        return docs[itm];
      });
      var docsListIndex = _.map(docs2, itm => {
        return {
          path: baseUrl + '/' + itm,
          meta: docs[itm].meta,
          html: docs[itm].html
        };
      });
      docsListIndex = _.orderBy(docsListIndex, 'meta.date').reverse();
      if(limit){
        output = docsListIndex.slice(0, limit);
      } else {
        output = docsListIndex;
      }
      cb(null, output);
    });
  });
};
