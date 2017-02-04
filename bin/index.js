#!/usr/bin/env node


const program = require('commander');
const blockstatic = require('../');
const jf = require('jsonfile');

let defaultcontent = {};


// make this available as a command line program
if (!module.parent) {
    program
        .version('1.2.1')
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
    jf.readFile(program.config, (err, defaultcontent) => {
        if (err) {
            return done(err);
        }
        blockstatic.buildPages(program.src, program.output, defaultcontent, done);
    });
}