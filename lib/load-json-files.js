const jf = require('jsonfile')

async function loadJsonFiles ({ data = {} }, { data: optionData = {} }) {
  const loadingDocs = Object.entries({ ...optionData, ...data }).map(async ([key, jsonSrcPath]) => {
    const loadedDoc = await jf.readFile(jsonSrcPath)
    return {
      loadedDoc,
      key
    }
  })
  const allDocs = await Promise.all(loadingDocs)
  return allDocs.reduce((dataCollection, { key, loadedDoc }) => {
    return ({
      ...dataCollection,
      [key]: loadedDoc
    })
  }, {})
}
module.exports = loadJsonFiles
