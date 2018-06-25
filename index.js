'use strict';

function main() {
    const DirWatcher = require('./modules/dirwatcher.js');
    const Importer = require('./modules/importer.js');
    const path = process.argv[2];
    const delay = process.argv[3];
    const dir = new DirWatcher(path, delay);
    const importer = new Importer(dir);
    importer.on('import',(path)=>{
        importer.importSync(path);
    });
    dir.on('changed', () => {
        importer.emit('import', path);
    });
    dir.watch();
}
main();