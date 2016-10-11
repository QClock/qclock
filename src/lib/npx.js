
const EventEmmiter = require('events')
const FadeCandy = require('tessel2-fadecandy')
const config = require('../config/config.js')

module.exports = class NeoPixels extends EventEmmiter {
    constructor () {
        super()

        this.ready = false

        if (!config.SKIP_FADECANDY) {

            this.fadecandy = new FadeCandy()
            this.fadecandy.on(FadeCandy.events.READY, () => {
                //fadecandy.config.set(fadecandy.Configuration.schema.DISABLE_KEYFRAME_INTERPOLATION, 1)
                this.fadecandy.clut.create()
            })
            this.fadecandy.on(FadeCandy.events.COLOR_LUT_READY, () => {
                console.log('LUT READY')
                this.ready = true
                this.emit('ready')
            })

        } else {
            console.warn('FadeCandy module skipped by config!')
            process.nextTick(() => this.emit('ready'))
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
