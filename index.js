'use strict';

function main() {
    const DirWatcher = require('./modules/dirwatcher.js');
    const importer = require('./modules/importer.js');
    const path = process.argv[2];
    const delay = process.argv[3];
    console.log(path);
    console.log(delay);
    const dir = new DirWatcher(path, delay);
    dir.on('changed', () => {console.log(`Inside function changed.`); });
    dir.watch();
}
main();