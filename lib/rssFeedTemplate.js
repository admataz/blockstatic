const path = require('path');
const url = require('url');
const RSS = require('rss');


let site = {};


function compileFeed(docs, siteconfig){
  site = siteconfig;

  let feed = new RSS({
    title: site.title,
    description: site.description,
    generator: 'blockstatic',
    home_page_url: site.home_page_url,
    feed_url: site.feed_url,
    expired: false
  });



  if('icon' in site){
    feed.image_url = site.icon;
  }

  docs.forEach((doc) => {
    feed.item(compileItem(doc));
  });

  return feed.xml();
}

function makePermalink(itemroot, itemslug){
  let u = url.parse(itemroot);
  u.pathname = path.normalize(`${u.pathname}/${itemslug}`);
  return url.format(u);
  // return path.normalize(`${u.path}/${itemslug}`);

}

function compileItem(doc){

  let feedItem = {};
  feedItem.guid = makePermalink(site.item_root, doc.path);
  feedItem.title = doc.meta.title;
  feedItem.description = doc.html;
  feedItem.url = makePermalink(site.item_root, doc.path);
  if( ('keywords' in doc.meta)  ) {
    feedItem.categories = doc.meta.keywords.split(',');
  }
  feedItem.date = doc.date;
  feedItem.author = doc.meta.author;

  return feedItem;
}



module.exports = function(docs, siteconfig, cb ){
  try {
    cb(null, compileFeed(docs, siteconfig));
  } catch (error) {
    return cb(error);
  }
};
