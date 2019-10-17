# Blockstatic HTML content page generator

*Blockstatic* is a collection of utilities that can be used to generate static HTML content pages from Markdown and JSON data files and using Handlebars.js templates. This module can be used alongside other build tasks that look after assets, scripts or styles.

## Installation
`npm install --save-dev blockstatic`

## Usage

Blockstatic can be used as with a simple command line interface - or as a library in your custom build scripts. 

The most important interfaces are the `buildContentList()` and `buildPages()` which between them allow you to define a directory containing content pages, and with some config options to build HTML output. 

e.g.

``` javascript
blockstatic.buildContentList('./src/content/pagedata', 'https://admataz.com/')
.then(contentPages => blockstatic.buildPages(contentPages, './dist', options));
```

This will scan the contents of the source path for Markdown and JSON files, and convert each into an HTML page, according to the options passed to it, or defined in the loaded JSON.


### 1. Preparing content

Individual pages can be defined with JSON or as Markdown with YAML front-matter variables


- assets:  object with arrays containing assetts for this page.
- indexPages:  object with list source and ouput options 
- data: object with  each property a path to a json file containing data for the page
- docs: object with each property a path to a markdown file for rendering in the page
- routePath: the path to this page
- meta: key/value pairs for title, author, date, published, and any others like keywords, description etc



#### JSON
- `routePath` - the file location (folder) where the output HTML will be written
- `docs` - a hash of ids and markdown files, which are pulled into the template by key
- `data` - a hash of ids and JSON files to be used in the handlebars templates, identified in the template by the key
- `indexPages` - generates a block containing a list of links or pages, as defined by the object
- `templates` - define a `page` (inner) and `html` (outer) template for each page - paths to `.handlebars` files

e.g. a page definition
```json
{
    "routePath": "about",
    "docs": {
        "page": "./sample_content/pages/home.md",
        "about": "./sample_content/pages/about.md"
    },
    "data": {
        "common": "./sample_content/data/global-content.json"
    },
    "indexPages": {
         "articlesIndex": {
           "inputPath": "./sample_content/articles",
            "outputPath": "articles", 
            "limit": 10
          }
     },  
    "templates": {
        "page": "./sample_content/templates/page_home.handlebars",
        "html": "./sample_content/templates/html.handlebars"
    },
    "meta": {
      "title": "admataz. ideas + code",
      "author": "Adam Davis",
      "date": "2019-10-07",
      "description": "admataz",
      "keywords": "code, adam davis, web",
      "published": true
    }

}
```

#### Markdown with front-matter
The markdown parser supports standard Markdown with a YAML front-matter:

Note for markdown the `routePath` `docs` `data` `indexPages` `templates` `assets` are extracted, and what remains is `meta`


```yaml
---
author: Adam Davis  
date: 2012-01-16  
description: "Some thoughts on code, beauty and art: my response to a request from a journalist."
keywords: code, beauty, art, opinion,  
title: code, beauty and art.
published: true
indexPages: 
    listIndex:
        inputPath: "./src/content/code-ideas"
        outputPath: "/code-ideas"
        limit: 10
assets: 
  js: 
    - ./src/scripts/funky.js
---
```



That should get you started.


### Example

In the example below I am generating pages for my website.

```js

const config = {
   templates: {
    html: "./src/templates/html.handlebars",
    page: "./src/templates/page.handlebars"
  },
  site: {
    title: "admataz - code and javascript",
    homePageUrl: "http://admataz.com",
    feedUrl: "http://admataz.com/feed.json",
    description: "Site for admataz",
    itemRoot: "http://admataz.com/"
  }
    baseUrl: 'https://admataz.com'
  }

let compiledContent
blockstatic.buildContentList('./src/pages', 'https://admataz.com', 0)
.then(contentList => blockstatic.buildPages(contentList, './dist', config ))
.then(contentPages => await Promise.all(contentPages))
.then(compcontent => {
  compiledContent = compcontent
  return blockstatic.jsonFeedTemplate(
    compiledContent,
    options.site
  )
  }
  )
.then(jsonFeed => jf.writeFile(`${dest}/index.json`, jsonFeed))
.then(() => {
  return blockstatic.rssFeedTemplate(
    compiledContent,
    options.site
  )
  }
  )
  .then(rssFeed => fs.writeFile(`${dest}/index.xml`, rssFeed, 'utf8'))
  .catch(err => console.log(err))

```

### Command-line

You can integrate this basic interface into your npm scripts or other build tools: 

```
Options:
  -V, --version        output the version number
  -c, --config <path>  JSON input for default values (site details, templates for html and page required)
  -s, --src <path>     Source content folder (.md and .json)
  -u, --baseurl <url>  Base url for the generated html
  -o, --output <path>  Output dir path
  -h, --help           output usage information
```


### Tests
I started writing some - these need completing.



### License
The MIT License (MIT)
Copyright (c) 2019 Adam Davis

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
