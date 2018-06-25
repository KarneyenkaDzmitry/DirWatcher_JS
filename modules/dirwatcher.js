'use strict';

const EventEmitter = require('events');
const fs = require('fs');
const paths = require('path');

//let emitter = new EventEmitter();
class DirWatcher extends EventEmitter {
    constructor(path, delay) {
        super();
        this.path = path;
        this.delay = delay;
    }
    watch() {
        let base = fs.statSync(this.path).mtimeMs;
        setInterval(() => {
            let mark = fs.statSync(this.path).mtimeMs;
            if (base < mark) {
                base = mark;
                console.log(mark);
                this.emit('changed');
            } else {
                console.log(`I keep an eye on ${this.path} directory with delay ${this.delay}.`);
            }
        }, this.delay)
    }
}

module.exports = DirWatcher;