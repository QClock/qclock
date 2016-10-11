var util = require('util');
var EventEmitter = require('events').EventEmitter;

var WifiMock = function () {
    EventEmitter.call(this);

    this.ap = {
        on: function () {},
        create: (data, cb) => {
            setTimeout(()=>{ cb(null, {ip: '0.0.0.0'}) }, 400)
        }
    }


}

util.inherits(WifiMock, EventEmitter);

module.exports = new WifiMock();