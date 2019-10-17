'use strict'

const compilePageObject = require('./compile-page-object')
const loadTemplate = require('./load-template')
const writeHtmlPage = require('./write-html-page')
const copyPageAssets = require('./copy-page-assets')

async function buildPages (pagesList, outputDir, options) {
  const contentList = pagesList
    .filter(a => a && a.meta.published)
    .map(async page => {
      const templates = { ...options.templates, ...page.templates }

      if (!templates || !templates.page || !templates.html) {
        throw new Error('No Template supplied')
      }

      const compiledPage = await compilePageObject(page, options)
      const pageContent = await loadTemplate(compiledPage, templates.page)
      const pageHtml = await loadTemplate(
        { ...compiledPage, pageContent },
        templates.html
      )
      const pageOutputDir = `${outputDir}/${page.routePath}`
      await writeHtmlPage(pageOutputDir, pageHtml)
      await copyPageAssets(pageOutputDir, page.assets)
      return compiledPage
    })
  return contentList
}

module.exports = buildPages
