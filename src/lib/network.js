var config = require('../config.js')
var util = require('util');
var EventEmitter = require('events');
var tessel

const events = {
    READY: 'ready',
    ERROR: 'error',
    DISCONNECT: 'disconnect',
    TIMEOUT: 'timeout'
}

module.exports = class Network extends EventEmitter {

    constructor(config) {
        super()

        this.created = false

        if (config.TESSEL) {
            tessel = require('tessel')
            this.network = tessel.network
            this.network.wifi.disable((err)=>this.__onPrepared(err))
        } else {
            this.network = require('./util/network-mock')
        }

        this.config = config.NETWORK

        this.network.ap.on(events.ERROR, (err)=>this.__onError(err))
    }

    create () {
        if (this.created) return

        let { ssid, password, security } = this.config

        this.network.ap.create({
            ssid,
            password,
            security
        }, (err, settings)=>this.__onCreated(err, settings))

        this.created = true
    }

    __onCreated (err, settings) {
        if (err) return console.error(err)

        this.emit(events.READY, settings)
    }

    __onPrepared () {
        this.create()
    }

    __onError (err) {
        console.log('network error', err)
        this.emit(events.DISCONNECT)
        this.created = false
        this.create();
    }
}