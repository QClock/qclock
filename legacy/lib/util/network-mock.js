const util = require('util');
const EventEmitter = require('events').EventEmitter;


class WifiMock extends EventEmitter {

    constructor () {

        super()

        this.ap = {
            on: function () {},
            create: (data, cb) => {

                setTimeout(()=>{ cb(null, {ip: '0.0.0.0'}) }, 400)

            }
        }
    }
}

module.exports = new WifiMock();