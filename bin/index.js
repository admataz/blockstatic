#!/usr/bin/env node

const program = require('commander')
const fs = require('fs').promises
const jf = require('jsonfile')
const blockstatic = require('../')

async function init (srcDir, dest, baseUrl, options = {}) {
  const feedsListSrc = await blockstatic.buildContentList(srcDir, baseUrl, 0)
  const contentList = await blockstatic.buildPages(feedsListSrc, dest, {
    ...options,
    baseUrl
  })
  const compiledContent = await Promise.all(contentList)

  const jsonFeed = blockstatic.jsonFeedTemplate(
    compiledContent,
    options.site
  )
  await jf.writeFile(`${dest}/index.json`, jsonFeed)

  const rssFeed = blockstatic.rssFeedTemplate(compiledContent, options.site)
  await fs.writeFile(`${dest}/index.xml`, rssFeed, 'utf8')

  return compiledContent
}

module.exports = init
if (!module.parent) {
  program
    .version('2.0')
    .option('-c, --config <path>', 'JSON input for default values (site details, templates for html and page required)')
    .option('-s, --src <path>', 'Source content folder (.md and .json)')
    .option('-u, --baseurl <url>', 'Base url for the generated html')
    .option('-o, --output <path>', 'Output dir path')
    .parse(process.argv)

  jf.readFile(program.config)
    .then(loadedConfig => init(program.src, program.output, program.baseurl, loadedConfig))
    .then(() => 'compiled!')
    .catch(err => console.log(err))
}
