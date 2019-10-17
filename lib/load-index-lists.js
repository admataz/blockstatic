const indexList = require('./index-list')

async function loadIndexLists ({ indexPages = {} }, { indexPages: optionIndexPages = {} }) {
  const pageIndexLists = Object.entries({
    ...optionIndexPages,
    ...indexPages
  }).map(async ([key, { inputPath, outputPath, limit }]) => {
    const pages = await indexList(inputPath, outputPath, limit)
    return {
      key,
      pages
    }
  })
  const allLists = await Promise.all(pageIndexLists)
  return allLists.reduce((listCollection, { key, pages }) => {
    return {
      ...listCollection,
      [key]: pages
    }
  }, {})
}
module.exports = loadIndexLists
