var test = require('tape');


var loadTemplate = require('../lib/loadTemplate');


test('no supplied template should throw an error', (t)=>{
  t.throws(loadTemplate);
  t.end();
});


test('invalid path to template file should throw an error', (t)=>{
    loadTemplate(null, '/tmp/nowhere', (err, str)=>{
      t.ifError(err);
      t.end();
});

/*test('valid path to template file should result in a string', (t)=>{
  loadTemplate(null, '/tmp/nowhere', (err, str)=>{
      t.false(err);
      t.end();

});*/



});
