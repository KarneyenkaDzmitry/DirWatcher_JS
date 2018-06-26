'use strict';

const EventEmitter = require('events');
const fs = require('fs');

class DirWatcher extends EventEmitter {
    constructor(path, delay) {
        super();
        this.path = path;
        this.delay = delay;
    }
    watch() {
        let base = fs.statSync(this.path).mtimeMs;
        setInterval(() => {
            let ind = fs.statSync(this.path).mtimeMs;
            if (base < ind) {
                base = ind;
                this.emit('changed');
            } else {
                console.log(`I keep an eye on ${this.path} directory with delay ${this.delay}.`);
            }
        }, this.delay)
    }
}

module.exports = DirWatcher;