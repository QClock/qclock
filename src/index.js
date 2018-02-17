import log from './log'
import store from './store'

import Server from './server'
import Clockwork from './clockwork'
import Time from './time'
import Clockface from './clockface'

log.info('ready')

const server = new Server(store)
const clockwork = new Clockwork(store)
const time = new Time(store)
const clockface = new Clockface(store, time);

process.on('uncaughtException', (err) => {
    log.fatal(err)
});

server.start({
    ip: '0.0.0.0',
    port: 9090
})

clockwork.start(() => clockface.render())


