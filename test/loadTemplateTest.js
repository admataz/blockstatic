var test = require( 'tape' );
var loadTemplate = require( '../lib/loadTemplate' );
var jsdom  = require('jsdom');


test( 'no supplied template should throw an error', ( t ) => {
  t.throws( loadTemplate );
  t.end();
} );


test( 'invalid path to template file should throw an error', ( t ) => {
  loadTemplate( null, '/tmp/nowhere', ( err, str ) => {
    t.ok( err, "error should not be null" );
    t.end();
  } );
} );

test( 'valid path to template file should result in a string', ( t ) => {
  loadTemplate( null, './sample_content/templates/html.handlebars', ( err, str ) => {
    t.false( err );
    // it's been through handlebars - but can't guarantee it's anything more than a string
    t.ok(typeof str, 'string');
    t.end();
  } );
} );
