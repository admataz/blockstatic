'use strict'

const loadIndexLists = require('./load-index-lists')
const loadJsonFiles = require('./load-json-files')
const loadDocuments = require('./load-documents')
const mapAssetPaths = require('./map-asset-paths')

async function compilePageObject (page, options) {
  const docs = await loadDocuments(page, options)
  const data = await loadJsonFiles(page, options)
  const assets = mapAssetPaths(page, options)
  const indexPages = await loadIndexLists(page, options)

  return {
    site: options.site || {},
    meta: { ...(options.meta || {}), ...(page.meta || {}) },
    assets,
    indexPages, // TODO: once the other document listing and building functions are in place
    elements: {}, // TODO: assess the use case for this - was json data driven, but maybe more a 'content with template' idea - content can be json or an md
    data,
    docs,
    routePath: `${options.baseUrl || ''}/${page.routePath}`
  }
}

module.exports = compilePageObject
