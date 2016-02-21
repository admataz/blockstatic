/**
*
*/

var test = require('tape');
var buildPages = require('../lib/buildPages');
var testoptions = {
  'templates': {
    'html': './sample_content/templates/html.handlebars',
    'page': './sample_content/templates/page.handlebars'
  }
};
test('valid list compiled from file dir containing .md files', (t) => {
  buildPages('./sample_content/articles', './testbuild/articlepages', testoptions, (err, files) => {
    if (err) {
      return console.log(err);
    }
    t.ok(typeof files, 'array');
    t.end();
    console.log(files);

  });

});


test('valid list compiled from file dir containing .json files', (t) => {
  buildPages('./sample_content/pagedata', './testbuild/jsonpages', testoptions, (err, files) => {
    if (err) {
      return console.log(err);
    }
    t.ok(typeof files, 'array');
    t.end();
    console.log(files);

  });

});
