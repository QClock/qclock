import log from './log'
import store from './store'
import Server from './server'

log.info('ready')

const server = new Server()

server.start({
    ip: '0.0.0.0',
    port: 9090
})