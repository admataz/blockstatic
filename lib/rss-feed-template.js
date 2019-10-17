const RSS = require('rss')

function compileFeed (docs, site) {
  const feed = new RSS({
    title: site.title,
    description: site.description,
    generator: 'blockstatic',
    home_page_url: site.homePageUrl,
    feed_url: site.feedUrl,
    expired: false
  })

  if ('icon' in site) {
    feed.image_url = site.icon
  }

  docs.forEach((doc) => {
    feed.item(compileItem(doc, site))
  })

  return feed.xml()
}

function compileItem (doc, site) {
  const permalink = new URL(doc.routePath, site.itemRoot).href
  const feedItem = {}
  feedItem.guid = permalink
  feedItem.title = doc.meta.title
  feedItem.description = doc.docs.page.body
  feedItem.url = permalink
  if (('keywords' in doc.meta)) {
    feedItem.categories = doc.meta.keywords.split(',').map(k => k.trim())
  }
  feedItem.date = doc.meta.date
  feedItem.author = doc.meta.author

  return feedItem
}

const rssFeedTemplate = function (docs, site) {
  return compileFeed(docs, site)
}

module.exports = rssFeedTemplate
