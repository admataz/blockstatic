# Blockstatic HTML content page generator

*Blockstatic* is a collection of utilities that can be used to generate static HTML content pages from Markdown and JSON data files and using Handlebars.js templates. This module can be used alongside other build tasks that look after assets, scripts or styles.

## Installation
`npm install --save-dev blockstatic`

## Usage

The main interface is the `buildPages()` function - which accepts a source path, a destination path, a defaults object, and a callback.

e.g.

``` javascript
blockstatic.buildPages('./src/content/pagedata', './dist', {}, cb);
```

This will scan the contents of the source path for Markdown and JSON files, and convert each into an HTML page, according to the options passed to it, or defined in the loaded JSON.


### 1. Preparing content

#### Individual pages can be defined with JSON or as Markdown


#### JSON
- `routePath` - the file location (folder) where the output HTML will be written
- `docs` - a hash of ids and markdown files, which are pulled into the template by key
- `data` - a hash of ids and JSON files to be used in the handlebars templates, identified in the template by the key
- `elements` - a partial, with a data source, to be embedded in the main html template, identified by the key
- `indexPages` - generates a block containing a list of links or pages, as defined by the object
- `templates` - define a `page` (inner) and `html` (outer) template for each page

e.g. a page definition
```json
{
    "routePath": "",
    "docs": {
        "page": "./sample_content/pages/home.md",
        "about": "./sample_content/pages/about.md"
    },
    "data": {
        "common": "./sample_content/data/global-content.json"
    },
    "elements": {
        "clientList": {
            "template": "./sample_content/templates/elements/client_list.handlebars",
            "data": "./sample_content/data/client-list.json"
        }
    },
    "indexPages": {
         "articlesIndex": {"inputPath": "./sample_content/articles", "template": "./sample_content/templates/pageindexes/pageIndexList.handlebars", "outputPath": "articles"}
     },  
    "templates": {
        "page": "./sample_content/templates/page_home.handlebars",
        "html": "./sample_content/templates/html.handlebars"
    }

}
```

#### Markdown
The markdown parser supports standard Markdown with a Metadata preamble:

```markdown
---
author: Adam Davis  
date: 2012-01-16  
description: "Some thoughts on code, beauty and art: my response to a request from a journalist."
keywords: code, beauty, art, opinion,  
title: code, beauty and art.
published: true
---

# Code, beauty and art

Like all forms of human communication, code for computer programs can contain expressiveness, humour, beauty, ugliness…

etc.

```

Below there is a more full example of how I generate content pages for my website.


That should get you started.

### Available methods
`blockstatic.buildPages(inputDir, outputDir, [options,] cb)` - generate static html for all pages in a source directory

`blockstatic.buildList(inputDir, cb)` - compile list of html from specific directory of markdown or JSON files

`blockstatic.compilePage( options, cb )` - Compile a specific json object structure that contains all the page information into a static html page


`blockstatic.indexPages(inputPath, outputPath, limit, cb)` - generates an index for a directory containing content


`blockstatic.loadDataObjectList(docs, cb)` - get a list/object of json document paths and turn them into a compiled objects


`blockstatic.loadDocument(contentPath, cb)` - Load a markdown file, and turn it into html+metadata


`blockstatic.loadDocumentList(docs, cb)` - Load a supplied list of documents into a results object with html for each keyed value

`blockstatic.loadJsonElements(els, cb)`- convert supplied list of json data items into an object containing compiled html for each keyed value


`blockstatic.loadJsonVars(path, cb)` - load a json file and turn it into a javascript object


`blockstatic.loadPageIndexList(els, cb)` - convert supplied list of json data items into an object containing compiled html for each keyed value


`blockstatic.loadTemplate(dataIn, templateIn, cb)` - loads and compiles a handlebars template with supplied data


`blockstatic.writeHtmlPage(dest, filecontents, cb)` - creates an index.html file within a specified path containing the supplied contents




### Example

In the example below I am generating pages for my website.

```
var blockstatic = require('blockstatic');
var async = require('async');


var defaultOptions = {
  "docs": {
    "contact": "./src/content/pages/contact-short.md",
    "about": "./src/content/pages/about-short.md",
    "site-links": "./src/content/pages/site-links.md"
  },
  "data": {
    "common": "./src/content/data/global-content.json"
  },
  "templates": {
    "html": "./src/templates/html.handlebars",
    "page": "./src/templates/page.handlebars"
  }
};


function init(callback){
    async.series([
      (cb) => {
        blockstatic.buildPages('./src/content/articles', './dist/articles', defaultOptions, cb);
      },
      (cb) => {
        blockstatic.buildPages('./src/content/pagedata', './dist', defaultOptions, cb);
      },
      (cb) => {
        blockstatic.buildPages('./src/content/case_studies', './dist/case-studies', defaultOptions, cb);
      }
    ],
      (err) => {
        if (err) {
              return callback(err)
            }
            console.log('Compiled Content!');
            return callback(null);
      }
    );
}


module.exports = init;
if (!module.parent) {
    init(function(err){
        if(err){
            return console.log(err);
        }

        console.log('Compiled Content!');

    })
}
```


### Tests
I started writing some - but these need completing.

### Roadmap
- a 'pure js' defined page - alongside the existing JSON and markdown allowing more custom page builds.
- Integration of client side scripts and styles into the page definition
- An idea to have swappable view rendering  - alternatives to Handlebars.js, maybe to experiment with React generated pages.  


### License
The MIT License (MIT)
Copyright (c) 2016 Adam Davis

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
