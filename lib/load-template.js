/**
 * loads and compiles a handlebars template with supplied data
 *
 * @param {Object} dataIn structured object containing content for the handlebars template
 * @param {String} templateIn path to the handlebars template
 *
 * TODO: look at providing a JSX option for templates
 *
 */
var fs = require('fs').promises
var handlebars = require('handlebars')

handlebars.registerHelper('dateFormat', function (context, block) {
  // TODO: make this multilanguage compatible
  var months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]
  var d = new Date(context)
  return d.getDate() + ' ' + months[d.getMonth()] + ' ' + d.getFullYear()
})

async function loadTemplate (dataIn = {}, templateIn, cb) {
  if (!dataIn) {
    dataIn = {}
  }
  if (!templateIn) {
    throw new Error('No source template provided')
  }
  const templateString = await fs.readFile(templateIn, { encoding: 'utf8' })
  const templateFunc = handlebars.compile(templateString)
  return templateFunc(dataIn)
}

module.exports = loadTemplate
