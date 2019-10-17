const utils = require('util')
const fs = require('fs').promises
const path = require('path')
const mkdirp = utils.promisify(require('mkdirp'))

async function copyPageAssets (dest, assetsCollections) {
  Object.entries(assetsCollections).forEach(async ([key, val]) => {
    await mkdirp(`${dest}/${key}`)
    val.forEach(async f => {
      try {
        await fs.copyFile(f, `${dest}/${key}/${path.basename(f)}`)
      } catch (error) {
        // don't throw - just alert
        console.error(`${error.path} could not be copied`)
      }
    })
  })
}

module.exports = copyPageAssets
