import EventEmitter from 'events'
import log from '../log'
import config from '../config'
import ws281x from 'rpi-ws281x-native'

export default class NeoPixels extends EventEmitter {

    constructor () {
        super()

        this.ws281x = ws281x

        //const pixelData = new Uint32Array(num_leds)

        this.ws281x.init(config.OUTER + config.INNER)

        //this.ready = false

        // ---- trap the SIGINT and reset before exit
        process.on('SIGINT', () => {
            this.ws281x.reset()
            process.nextTick(() => { process.exit(0) })
        });

    }

    send (data) {
        if (this.ws281x) {
            this.ws281x.render(data);
        }
    }

    clear () {
        let data = new Uint32Array(config.OUTER + config.INNER);
        data.fill(0)
        this.send(data)
    }
}