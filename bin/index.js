#!/usr/bin/env node


const program = require('commander');
const blockstatic = require('../');

let defaultcontent = {};


// make this available as a command line program
if (!module.parent) {
    program
        .version('1.1.4')
        .option('-c, --config <path>', 'JSON input for default values (templates for html and page required)')
        .option('-s, --src <path>', 'Source content folder')
        .option('-o, --output <path>', 'Output dir path')
        .parse(process.argv);

    function done(err, success) {
        if (err) {
            return console.log(err);
        }
        return console.log(success);
    }
    defaultcontent = require(program.config);
    blockstatic.buildPages(program.src, program.output, defaultcontent, done);
}