/**
 * compile  html from specific directory of markdown files
 */

'use strict'

var fs = require('fs').promises
var path = require('path')
var jf = require('jsonfile')
var loadDocument = require('./load-document')

async function buildContentList (inputDir) {
  // read the directory containing the markdown
  const files = await fs.readdir(inputDir)
  const validFiles = files.filter(f => ['.md', '.json'].includes(path.extname(f)))

  const compiled = validFiles.map(async file => {
    const ext = path.extname(file)
    const filepath = `${inputDir}/${file}`
    if (ext === '.md') {
      const { meta } = await loadDocument(filepath)
      const routePath =
        meta.routePath === undefined
          ? path.basename(file, '.md')
          : meta.routePath

      const {
        assets = {},
        docs = {},
        data = {},
        indexPages = {},
        elements = {},
        templates = {},
        ...rest
      } = meta

      return {
        meta: rest,
        docs: { ...docs, page: filepath },
        assets,
        routePath,
        data,
        indexPages,
        elements,
        templates
      }
    }
    if (ext === '.json') {
      return jf.readFile(filepath)
    }
    return null
  })
  return Promise.all(compiled)
}

module.exports = buildContentList
