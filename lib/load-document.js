'use-strict'

const fs = require('fs').promises
const fm = require('front-matter')
const marked = require('marked')

async function loadDocument (contentPath) {
  const fileContents = await fs.readFile(contentPath, 'utf8')
  const {
    attributes,
    body
  } = fm(fileContents)

  return {
    meta: attributes,
    body: marked(body)
  }
}

module.exports = loadDocument
