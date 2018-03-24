import './env'

import log from './log'
import store from './store'

import Server from './server'
import Network from './network'
import Clockwork from './clockwork'
import Time from './time'
import Clockface from './clockface'

log.info('ready')

const server = new Server(store)
const net = new Network(store)

const clockwork = new Clockwork(store)
const time = new Time(store)
const clockface = new Clockface(store, time);

process.on('uncaughtException', (err) => {
    log.fatal(err)
});

net.on(Network.READY, () => {
    server.start()
})

clockwork.start(() => {
    clockface.render()
})


