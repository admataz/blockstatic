/**
 * loads and compiles a handlebars template with supplied data
 * 
 * @param {Object} dataIn structured object containing content for the handlebars template
 * @param {String} templateIn path to the handlebars template
 * 
 */
var fs = require('fs');
var handlebars = require('handlebars');
var _ = require('lodash');


handlebars.registerHelper('dateFormat', function(context, block) {
  var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  var d = new Date(context);
  return d.getDate()+" "+months[d.getMonth()]+" "+d.getFullYear();
});

handlebars.registerHelper('raw-helper', function(options) {
  return options.fn();
});

module.exports = function(dataIn, templateIn, cb) {
  if (!dataIn) {
    dataIn = {};
  }
  if (!templateIn) {
    return cb(new Error('No source template provided'));
  }
  fs.readFile(templateIn, {
    encoding: 'utf8'
  }, function(err, str) {
    if (err) {
      return cb(err);
    }
    var templateFunc = handlebars.compile(str);
    var output = templateFunc(dataIn);
    cb(err, output);
  });
};