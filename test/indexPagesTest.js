/**
 *
 */

var test = require('tape');
var indexPages = require('../lib/indexPages');



test('generate index', (t)=>{

  indexPages('./sample_content/articles', (err, files)=>{
      console.log(files);
  });


})
