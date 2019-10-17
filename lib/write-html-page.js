/**
 * creates an index.html file within a specified path containing the supplied contents
 */

const fs = require('fs').promises
const util = require('util')
const mkdirp = util.promisify(require('mkdirp'))

async function writeHtmlPage (dest, filecontents = '') {
  if (!dest) {
    throw new Error('You must provide the destination of the HTML file to be written')
  }
  await mkdirp(dest)
  await fs.writeFile(`${dest}/index.html`, filecontents)
  return `${dest}/index.html`
};

module.exports = writeHtmlPage
