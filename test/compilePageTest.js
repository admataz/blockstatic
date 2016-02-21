/**
 *
 */

var test = require('tape');
var jsdom = require('jsdom');
var compilePage = require('../lib/compilePage');




var opts = {
  'routePath': 'about',
  'docs': {
    'page': './sample_content/pages/about.md'
  },
  'templates': {
    'html': './sample_content/templates/html.handlebars',
    'page': './sample_content/templates/page.handlebars'
  }
};


test('valid templates and options', (t) => {
  compilePage(opts,
    (err, pg) => {
      t.ok(typeof pg, 'string');

      jsdom.env(pg,
        ['http://code.jquery.com/jquery.js'],
        (err, window) => {
          t.ok(window.$('body'));
          t.end();
        });


    });
});
