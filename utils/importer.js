'use strict';
const EventEmitter = require('events');
const fs = require('fs');
const p = require('path');
const convertor = require('./csv_to_json.js');
class Importer extends EventEmitter {
    constructor() {
        super();
    }

   async import(path) {
        return new Promise((resolve, reject) => {
            try {
                this.importSync(path);
                return resolve('success');
            } catch (error) {
                return reject(error);
            }
            console.log('Asinchronim method of realisation of convertion and archive CSV - files into json');
        });

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