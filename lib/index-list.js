const buildContentList = require('./build-content-list')
const mapAssetPaths = require('./map-asset-paths')


async function indexList (inputPath, outputPath, limit) {
  const pagesList = await buildContentList(inputPath)
  return pagesList
    .filter(a => a && a.meta.published)
    .sort((a, b) => (a.meta.date > b.meta.date ? -1 : 1))
    .slice(0, limit || pagesList.length)
    .map(p => ({
      meta: p.meta,
      assets: mapAssetPaths(p, {}),
      routePath: `${outputPath || ''}/${p.routePath}`
    }))
}
module.exports = indexList
