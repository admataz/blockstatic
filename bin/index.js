#!/usr/bin/env node


const program = require('commander');
const blockstatic = require('../');
const jf = require('jsonfile');

let defaultcontent = {};


// make this available as a command line program
if (!module.parent) {
    program
        .version('1.2.1')
        .option('-c, --config <path>', 'JSON input for default values (site details, templates for html and page required)')
        .option('-s, --src <path>', 'Source content folder')
        .option('-o, --output <path>', 'Output dir path')
        .option('-i, --index', 'Generate index of the directory')
        .parse(process.argv);

    function done(err, success) {
        if (err) {
            return console.log(err);
        }
        return console.log(success);
    }


    jf.readFile(program.config, (err, defaultcontent) => {
        if (err) {
            return done(err);
        }

        blockstatic.buildPages(program.src, program.output, defaultcontent, (err, result) => {
            if (err) {
                return done(err);
            }
            if (program.index) {
                blockstatic.indexPages(program.src, '.', (err, docsListIndex) => {
                    if (err) {
                        return err;
                    }

                    jf.writeFile(`${program.output}/index.json`, docsListIndex, (err, result) => {
                        if (err) {
                            return done(err);
                        }
                        
                        blockstatic.jsonFeedPages(program.src, '.', defaultcontent.site, (err, jsonfeed) => {
                            jf.writeFile(`${program.output}/feed.json`, jsonfeed, (err, result) => {
                            if (err) {
                                return done(err);
                            }

                            return done(null, `blockstatic: content files from ${program.src} converted to html in ${program.output} with an index`);

                        })
                        
                    });
                });
                });
            } else {
                done(null, `blockstatic: content files from ${program.src} converted to html in ${program.output}`);
            }
        });
    });
}