'use strict';
const EventEmitter = require('events');
const xlsx = require('xlsx');
const fs = require('fs');
const p = require('path');
class Importer extends EventEmitter {
    constructor() {
        super();
    }
    async import(path) {
        fs.readdir(path, (err, array) => {
            if (err) throw err;
            array.forEach((element) => {
                fs.realpath(path, (err, elPath) => {
                    if (err) throw err;
                    elPath += '\\' + element;
                    fs.stat(elPath, (err, stats) => {
                        if (err) throw err;
                        if (stats.isFile && element.endsWith('.csv')) {
                            const array = xlsx.readFile(elPath).Sheets.Sheet1;
                            fs.writeFile(`./archive/${p.basename(element, '.csv')}.json`,
                                JSON.stringify(xlsx.utils.sheet_to_json(array)), 'utf8',
                                (err) => {
                                    if (err) throw err;
                                });
                        }
                    })
                })
            });
        })
    }
    importSync(path) {
        fs.readdirSync(path).forEach((element) => {
            const elPath = fs.realpathSync(path) + '\\' + element;
            const stats = fs.statSync(elPath);
            if (stats.isFile && element.endsWith('.csv')) {
                const array = xlsx.readFileSync(elPath).Sheets.Sheet1;
                fs.writeFileSync(`./archive/${p.basename(element, '.csv')}.json`, JSON.stringify(xlsx.utils.sheet_to_json(array)), 'utf8');
            }
        });
    }
}

module.exports = Importer;