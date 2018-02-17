
import { EventEmmiter } from 'events'
import log from '../log'

const FadeCandy = require('node-fadecandy')

export default class NeoPixels extends EventEmmiter {

    constructor () {
        super()

        this.ready = false

        //if (!config.SKIP_FADECANDY) {

            this.fadecandy = new FadeCandy()
            this.fadecandy.on(FadeCandy.events.READY, () => {
                //fadecandy.config.set(fadecandy.Configuration.schema.DISABLE_KEYFRAME_INTERPOLATION, 1)
                this.fadecandy.clut.create()
            })
            this.fadecandy.on(FadeCandy.events.COLOR_LUT_READY, () => {
                log.info('LUT READY')
                this.ready = true
            })

        //} else {
          //  log.info('FadeCandy module skipped by config!')
        //}
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
