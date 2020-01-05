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
            this.getOuterPixels(), // 58 pixels +
            this.getStubPixels(), // 6 pixels +
            this.getInnerPixels() // 56 pixels +
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

        // the 0 is the 27th index on OUTER
        actual = actual + 28

        // minor corrections on actual pixel positions
        if (this.date.minutes() > 15 && this.date.minutes() <= 30) {
            actual += 1
        }

        if (actual >= outerPixelCount) {
            actual = actual - outerPixelCount
        }

        return actual
    }

    getHourPixel () {
        const { innerPixelCount } = this.store.getState();
        let hours = this.date.hours()
        let minutes = this.date.minutes()
        let actual = 0

        // by default we use 12-hour format
        // if you want a clockface that shows 24, override this method
        if (hours >= 12) {
            hours = hours-12;
        }
        if (hours == 0) {
            hours = 12;
        }

        // 48 units:
        // 12 hours plus 3 partial for every hour
        // 4 unit * 12

        // a whole hour unit is divisible by 4
        // 4 -> 1
        // 8 -> 2
        // 12 -> 3
        // etc

        const units = (hours * 4) + ((minutes / 60) * 4)

        // innerPixelCount / 48 = 1.16
        actual = Math.ceil( ( innerPixelCount / 48 ) * ( units ) )

        // console.log('inner pixels, zero based: ', actual);

        // the brainf*ck below is needed because the led strip is:
        //     a/ in reverse order on the inner side
        //     b/ starts index 0 at the bottom, near the 6-hour mark

        // the hour-0 is the 29th index on INNER
        const zeroPixel = 28

        if (actual < zeroPixel) {
            actual = zeroPixel - actual
        } else if (zeroPixel - actual == 0) {
            actual = 55
        } else if (actual > zeroPixel && zeroPixel - actual < 0) {
            actual = innerPixelCount - 1 - (actual - zeroPixel);
        }

        // console.log('final pixel position', actual, actual + 64);

        return actual
    }

    getStubPixels () {
        const { stubPixelCount } = this.store.getState();
        return (new Buffer(stubPixelCount * 3)).fill(0);
    }

    getOuterPixels (date) {}

    getInnerPixels (date) {}
}
