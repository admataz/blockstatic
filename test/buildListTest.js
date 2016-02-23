/**
*
*/

var test = require('tape');
var buildList = require('../lib/buildList');

test('valid list compiled from file dir containing .md files', (t) => {
  buildList('./sample_content/articles', (err, files)=>{
    if(err){
      return console.log(err);
    }
    console.log(files);
    t.ok(typeof files,  'array');
    t.end();

  });

});


test('valid list compiled from file dir containing .json files', (t) => {
  buildList('./sample_content/pagedata', (err, files)=>{
    if(err){
      return console.log(err);
    }
    t.ok(typeof files,  'array');
    t.end();

  });

});
