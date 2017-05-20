const path = require('path');
const url = require('url');

let site = {};

function compileFeed(docs, siteconfig){
  site = siteconfig;
  let jsonfeed = {
    version: 'https://jsonfeed.org/version/1',
    title: site.title,
    home_page_url: site.home_page_url,
    feed_url: site.feed_url,
    description: site.description,
    expired: false
  };

  if('icon' in site){
    jsonfeed.icon = site.icon;
  }
  if('favicon' in site){
    jsonfeed.icon = site.icon;
  }

  jsonfeed.items = docs.map(compileItem);

  return jsonfeed;
}

function makePermalink(itemroot, itemslug){
  let u = url.parse(itemroot);
  u.pathname = path.normalize(`${u.pathname}/${itemslug}`);
  return url.format(u);
  // return path.normalize(`${u.path}/${itemslug}`);

}

function compileItem(doc){

  let feedItem = {};
  feedItem.id = makePermalink(site.item_root, doc.path);
  feedItem.title = doc.meta.title;
  feedItem.summary = doc.meta.description;
  feedItem.content_html = doc.html;
  feedItem.url = makePermalink(site.item_root, doc.path);
  if( ('keywords' in doc.meta)  ) {
    feedItem.tags = doc.meta.keywords.split(',');
  }
  feedItem.date_published = doc.date;
  feedItem.author = {
    name: doc.meta.author
  };

  return feedItem;
  //  `{
  //           "id": "{{ post.url | absolute_url | sha1 }}",
  //           "title": {{ post.title | jsonify }},
  //           "summary": {{ post.seo_description | jsonify }},
  //           "content_text": {{ post.content | strip_html | strip_newlines | jsonify }},
  //           "content_html": {{ post.content | strip_newlines | jsonify }},
  //           "url": "{{ post.url | absolute_url }}",
  //           {% if post.image.size > 1 %}"image": "{{ post.image }}",{% endif %}
  //           {% if post.link.size > 1 %}"external_url": "{{ post.link }}",{% endif %}
  //           {% if post.banner.size > 1 %}"banner_image": "{{ post.banner }}",{% endif %}
  //           {% if post.tags.size > 1 %}"tags": {{ post.tags | jsonify }},
  //           {% if post.enclosure.size > 1 %}"attachments": [
  //           {
  //             "url": "{{ post.enclosure }}",
  //             "mime_type": "{{ post.enclosure_type }}",
  //             "size_in_bytes": "{{ post.enclosure_lenght }}"
  //           },{% endif %}
  //           "date_published": "{{ post.date | date_to_xmlschema }}",
  //           "date_modified": "{{ post.date | date_to_xmlschema }}",
  //           "author": {
  //               "name": "{{ post.author }}"
  //           }`;
}



module.exports = function(docs, siteconfig, cb ){
  try {
    cb(null, compileFeed(docs, siteconfig));
  } catch (error) {
    return cb(error);
  }
};
