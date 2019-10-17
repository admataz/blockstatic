const loadDocument = require('./load-document')
async function loadDocuments ({ docs = {} }, { docs: optionDocs = {} }) {
  const loadingDocs = Object.entries({ ...optionDocs, ...docs }).map(async ([key, docSrcPath]) => {
    const loadedDoc = await loadDocument(docSrcPath)
    return {
      loadedDoc,
      key
    }
  })
  const allDocs = await Promise.all(loadingDocs)
  return allDocs.reduce((docsCollection, { key, loadedDoc }) => {
    return ({
      ...docsCollection,
      [key]: loadedDoc
    })
  }, {})
}
module.exports = loadDocuments
