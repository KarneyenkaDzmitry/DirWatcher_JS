'use strict';

function main() {
    const DirWatcher = require('./utils/dirwatcher.js');
    const Importer = require('./utils/importer.js');
    const path = process.argv[2];
    const delay = process.argv[3];
    const dir = new DirWatcher(path, delay);
    const importer = new Importer(dir);
    importer.import(path, err => {
        if (err) console.log(err);
    });
    importer.on('import', (path) => {
        importer.import(path, err => {
            if (err) console.log(err);
        });
    });
    dir.on('changed', () => {
        importer.emit('import', path);
    });
    dir.watch();
}
main();