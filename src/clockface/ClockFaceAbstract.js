const dim = require('../lib/util/dim')

module.exports = class ClockFaceAbstract {

    constructor (config) {
        this.config = config
    }

    getColor (segment, time) {
        let color = segment == 'outer' ? this.config.OUTER_COLOR : this.config.INNER_COLOR;

        if (this.config.DIM_PREVIEW ||
            (
                this.config.DIM_ENABLED &&
                this.config.DIM_FROM && this.config.DIM_TO &&
                (time.getHours() > this.config.DIM_FROM || time.getHours() < this.config.DIM_TO)
            )
        ) {
            color = dim(this.config.DIM_LEVEL, color)
        }

        return color
    }


    getMinutePixel (time) {
        // get the actual pixel that closest to the current minute
        let actual = Math.round(( this.config.OUTER / 60 ) * time.getMinutes() )

        // the 0 is the 28th index on OUTER
        actual = actual + 29

        if (actual >= this.config.OUTER) {
            actual = actual - this.config.OUTER
        }

        return actual
    }

    getHourPixel (time) {
        let hours = time.getHours()
        let minutes = time.getMinutes()
        let actual = 0

        // by default we use 12-hour format
        // if you want a clockface that shows 24, override this method
        if (hours >= 12) {
            hours = hours-12;
        }
        if (hours == 0) {
            hours = 12;
        }

        hours = hours + minutes / 60
        actual = Math.round( ( this.config.INNER / 12 ) * ( hours ) ) - 1

        // the brainf*ck below is needed because the led strip is:
        //     a/ in reverse order on the inner side
        //     b/ starts index 0 at the bottom, near the 6-hour mark

        // the hour-0 is the 27th index on INNER
        if (actual < 27) {
            actual = 27 - actual
        } else if (27 - actual == 0) {
            actual = 55
        } else if (actual > 27 && 27 - actual < 0) {
            actual = this.config.INNER - 1 - (actual - 27);
        }

        return actual
    }

    getStubPixels () {
        // todo config stub-pixel-count
        return (new Buffer(6 * 3)).fill(0);
    }

    getOuterPixels (date) {}

    getInnerPixels (date) {}
}
