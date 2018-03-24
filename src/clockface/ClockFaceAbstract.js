import dimRGB from '../lib/dimRGB'
import hsl2rgb from '../lib/hsl2rgb'

export default class ClockFaceAbstract {

    constructor (store) {
        this.store = store
    }

    render (date) {
        this.date = date
        return this.getBuffer()
    }

    getBuffer (next) {
        return Buffer.concat([
            this.getOuterPixels(),
            this.getStubPixels(),
            this.getInnerPixels()
        ])
    }

    getColor (hslColor) {
        let rgbColor = hsl2rgb(...hslColor)
        const { dim } = this.store.getState()

        if (
            dim.active &&
            (this.date.hours() > dim.from || this.date.hours() < dim.to)
        ) {
            let lightness = Math.round((dim.level / 100) * 50)
            rgbColor = hsl2rgb(hslColor[0], hslColor[1], lightness)
        }

        return rgbColor
    }

    getMinutePixel () {
        const { outerPixelCount } = this.store.getState();
        // get the actual pixel that closest to the current minute
        let actual = Math.round(( outerPixelCount / 60 ) * this.date.minutes() )

        // the 0 is the 28th index on OUTER
        actual = actual + 29

        if (actual >= outerPixelCount) {
            actual = actual - outerPixelCount
        }

        return actual
    }

    getHourPixel () {
        const { innerPixelCount } = this.store.getState();
        let hours = this.date.hours()
        let minutes = this.date.hours()
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
        actual = Math.round( ( innerPixelCount / 12 ) * ( hours ) ) - 1

        // the brainf*ck below is needed because the led strip is:
        //     a/ in reverse order on the inner side
        //     b/ starts index 0 at the bottom, near the 6-hour mark

        // the hour-0 is the 27th index on INNER
        if (actual < 27) {
            actual = 27 - actual
        } else if (27 - actual == 0) {
            actual = 55
        } else if (actual > 27 && 27 - actual < 0) {
            actual = innerPixelCount - 1 - (actual - 27);
        }

        return actual
    }

    getStubPixels () {
        const { stubPixelCount } = this.store.getState();
        return (new Buffer(stubPixelCount * 3)).fill(0);
    }

    getOuterPixels (date) {}

    getInnerPixels (date) {}
}
