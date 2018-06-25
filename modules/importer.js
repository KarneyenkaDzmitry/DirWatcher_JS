'use strict';
const EventEmitter = require('events');
const fs = require('fs');
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
                //console.log(`Path [${elPath}]`);
                this.convert(elPath);
            }
        });
        console.log('Synchronium method of realisation of convertion and archive CSV - files into json');
    }
    convert(path) {
        let content = fs.readFileSync(path, "utf8").split('\r\n');
        //content = content..split('\n')
        const keys = content[0].split(',');
        console.log(content.length);
        content.splice(0, 1);
        console.log(content.length);
        console.log(keys);
        let result = '';
        for (let j = 0; j<content.length; j++) {
            const values = content[j].split(',');
            result += `{`;
            for (let i = 0; i < keys.length; i++) {
                if (i !== keys.length - 1) {
                    result += `${keys[i]}:${values[i]},`;
                } else {
                    result += `${keys[i]}:${values[i]}`;
                }
            }
            if (j !== content.length - 1) {
                result += `},\n`;
            } else {
                result += `}`;
            }
        };
        console.log(result);
    }
}

module.exports = Importer;