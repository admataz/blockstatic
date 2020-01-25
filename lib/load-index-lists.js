const indexList = require('./index-list')

async function loadIndexLists ({ indexPages = {} }, { indexPages: optionIndexPages = {} }) {
  const pageIndexLists = Object.entries({
    ...optionIndexPages,
    ...indexPages
  }).map(async ([key, { inputPath, outputPath, limit, template = null }]) => {
    const pages = await indexList(inputPath, outputPath, limit)
    return {
      key,
      pages,
      template
    }
  })
  const allLists = await Promise.all(pageIndexLists)
  return allLists.reduce((listCollection, { key, pages, template }) => {
    return {
      ...listCollection,
      [key]: { pages, template }
    }
  }, {})
}
module.exports = loadIndexLists
