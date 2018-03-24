import EventEmitter from 'events'
import log from '../log'
import Net from './network-mock'
import * as actions from '../actions'

const events = {
    READY: 'ready',
    ERROR: 'error',
    DISCONNECT: 'disconnect',
    TIMEOUT: 'timeout'
}

export default class Network extends EventEmitter {

    static READY = events.READY

    constructor(store) {
        super()

        this.created = false
        this.store = store

        if (process.env.TESSEL) {
            this.network = require('tessel').network
            this.network.wifi.disable((err)=>this.__onPrepared(err))
        } else {
            log.info('Mocked network layer')
            this.network = new Net()
            this.create()
        }

        this.network.ap.on(events.ERROR, (err)=>this.__onError(err))
    }

    create () {
        if (this.created) return

        log.info('Creating network...')
        let { ssid, password, security } = this.store.getState().network

        this.network.ap.create({
            ssid,
            password,
            security
        }, (err, settings) => this.__onCreated(err, settings))

        this.created = true
    }

    __onCreated (err, settings) {
        if (err) return log.fatal(err)

        log.info('Network created!')

        let network = Object.assign({}, this.store.getState().network, settings)
        this.store.dispatch(actions.setNetwork(network))

        this.emit(events.READY, settings)
    }

    __onPrepared (err) {
        if (err) return log.fatal(err)

        this.create()
    }

    __onError (err) {
        log.fatal('network error', err)
        this.emit(events.DISCONNECT)
        this.created = false
        this.create();
    }
}