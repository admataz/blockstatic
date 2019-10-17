const buildContentList = require('./lib/build-content-list')
const buildPages = require('./lib/build-pages')
const compilePageObject = require('./lib/compile-page-object')
const copyPageAssets = require('./lib/copy-page-assets')
const loadDocument = require('./lib/load-document')
const loadDocuments = require('./lib/load-documents')
const loadTemplate = require('./lib/load-template')
const writeHtmlPage = require('./lib/write-html-page')

const loadIndexLists = require('./lib/load-index-lists')
const indexList = require('./lib/index-list')
const jsonFeedTemplate = require('./lib/json-feed-template')
const rssFeedTemplate = require('./lib/rss-feed-template')

module.exports = {
  buildContentList,
  buildPages,
  compilePageObject,
  copyPageAssets,
  loadDocument,
  loadDocuments,
  loadTemplate,
  writeHtmlPage,
  loadIndexLists,
  indexList,
  jsonFeedTemplate,
  rssFeedTemplate
}
