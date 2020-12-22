require('dotenv').config()

import log from './log'
import store from './store'

import Server from './server'
import NeoPixels from './neopixels'
import Clockwork from './clockwork'
import Time from './time'
import Clockface from './clockface'

log.info('ready')

const server = new Server(store)
const neopixels = new NeoPixels(store)

const clockwork = new Clockwork(store)
const time = new Time(store)


// todo on neopixel ready
const clockface = new Clockface(store, time, neopixels);

process.on('uncaughtException', (err) => {
    log.fatal(err)
});

server.start()

clockwork.start(() => {
    clockface.render()
})


