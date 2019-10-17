
function compileFeed (docs, site) {
  const jsonfeed = {
    version: 'https://jsonfeed.org/version/1',
    title: site.title,
    home_page_url: site.home_page_url,
    feed_url: site.feed_url,
    description: site.description,
    expired: false
  }
  if ('icon' in site) {
    jsonfeed.icon = site.icon
  }
  if ('favicon' in site) {
    jsonfeed.icon = site.icon
  }
  jsonfeed.items = docs.map(doc => compileItem(doc, site))
  return jsonfeed
}

function compileItem (doc, site) {
  const permalink = new URL(doc.routePath, site.itemRoot).href
  const feedItem = {}
  feedItem.id = permalink
  feedItem.title = doc.meta.title
  feedItem.summary = doc.meta.description
  feedItem.content_html = doc.docs.page.body
  feedItem.url = permalink
  if (('keywords' in doc.meta)) {
    feedItem.tags = doc.meta.keywords.split(',').map(k => k.trim())
  }
  feedItem.date_published = doc.meta.date
  feedItem.author = {
    name: doc.meta.author
  }

  return feedItem
}

const jsonFeedTemplate = function (docs, site) {
  return compileFeed(docs, site)
}

module.exports = jsonFeedTemplate
