var compilePage = require('../lib/compilePage');
var writeHtmlPage = require('../lib/writeHtmlPage');
var indexPages = require('../lib/indexPages');
var loadDocument = require('../lib/loadDocument');

function doPageIndex(src, dest, cb) {

  // load the .md page
  loadDocument(src, function(err, doc) {

    // regenerate the index page
    indexPages({
      contentPath: 'articles/',
      fileName: dest,
      doc: doc,
      systemPath: './build/'
    }, function(err) {
      cb();
    });
  });
}
function makePage() {



  //generate the html from the template, config and any attached .md and .json
  compilePage(options, function(err, result) {
    if (err) {
      return console.log(err);
    }
    var dest = './build/articles/' + path.basename(i, '.md');

    // write an html page for the route
    writeHtmlPage(dest, result, function(err, filePath) {
      if (err) {
        return console.log(err);
      }

      // regenerate the indexpgae
      doPageIndex(options.docs.page, filePath, function(err) {
        if (err) {
          return console.log(err);
        }
        cb();
      });
    });
  });
}
