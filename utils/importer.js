'use strict';
const EventEmitter = require('events');
const fs = require('fs');
const p = require('path');
const convertor = require('./csv_to_json.js');
class Importer extends EventEmitter {
    constructor(dirwatcher) {
        super();
        this.dirwatcher = dirwatcher;
    }

    import(path) {
        fs.readdir(path, function (err, result) {
            if (err) {
                console.log('Somethig wrong happened while the program was reading the directory: [' + path + ']', err);
            } else {
                result.forEach(element => {
                    fs.realpath(path, function (err, path) {
                        let elPath = path + '\\' + element;
                        if (err) {
                            console.log('Hell exists. It is here. ', err);
                        } else {
                            fs.stat(elPath, function (err, stats) {
                                if (err) {
                                    throw Error('This is just callback hell. Now I understand what does it means.', err);
                                } else {
                                    if (stats.isFile && element.endsWith('.csv')) {
                                        //console.log(`Path [${elPath}]`);
                                        //const data = fs.readFileSync(Path);
                                        //const xls = jsonConvert(data);
                                        //fs.writeFileSync(outputDir +'\\' + paths.basename(Path,'.json') + '.xlsx', xls, 'binary');
                                        //There is a code for convert json into xlsx format
                                    }
                                }
                            });
                        }
                    });
                });
            }
        });
        console.log('Asinchronim method of realisation of convertion and archive CSV - files into json');
    }
    importSync(path) {
        fs.readdirSync(path).forEach((element) => {
            const elPath = fs.realpathSync(path) + '\\' + element;
            const stats = fs.statSync(elPath);
            if (stats.isFile && element.endsWith('.csv')) {
                console.log('There should be run csv to json convertor with saving into archive directory.');
                // const content = fs.readFileSync(elPath, "utf8");
                // fs.writeFileSync(`./archive/${p.basename(element, '.csv')}.json`,convertor.convert(elPath), 'utf8');
            }
        });
        //console.log('Synchronium method of realisation of convertion and archive CSV - files into json');
    }
}

module.exports = Importer;