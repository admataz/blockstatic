const path = require('path')
function mapAssetPaths ({ assets = {}, routePath }, { assets: optionsAssets = {}, baseUrl }) {
  const mappedAssets = Object.entries(assets).reduce((assetsCollections, [key, collectionItems]) => {
    const combinedCollectionItems = [...(optionsAssets[key] || []), ...(collectionItems || [])]
    return ({
      ...assetsCollections,
      [key]: combinedCollectionItems.map(f => `${baseUrl || ''}/${routePath}/${key}/${path.basename(f)}`)
    })
  }, {})
  return mappedAssets
}
module.exports = mapAssetPaths
