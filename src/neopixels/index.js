import EventEmitter from 'events'
import log from '../log'

export default class NeoPixels extends EventEmitter {

    constructor () {
        super()

        this.ready = false

        if (process.env.NODE_ENV !== 'docker') {
            const FadeCandy = require('node-fadecandy')
            this.fadecandy = new FadeCandy()
            this.fadecandy.on(FadeCandy.events.READY, (...args) => {
                log.info("FadeCandy ready")
                //fadecandy.config.set(fadecandy.Configuration.schema.DISABLE_KEYFRAME_INTERPOLATION, 1)
                this.fadecandy.clut.create()
            })
            this.fadecandy.on(FadeCandy.events.COLOR_LUT_READY, (...args) => {
                log.info('LUT READY')
                this.ready = true
            })
        }
    }

    send (data) {
        if (this.ready && this.fadecandy) {
            this.fadecandy.send(data)
        }
    }

    clear () {
        let data = new Uint8Array((config.OUTER + config.INNER + 6) * 3);
        data.fill(0)
        this.send(data)
    }

}
