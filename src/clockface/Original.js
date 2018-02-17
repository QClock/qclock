

import ClockFaceAbstract from './ClockFaceAbstract'

const OUTERCOLOR = 'outerColor'
const INNERCOLOR = 'innerColor'

export default class Original extends ClockFaceAbstract {

    getOuterPixels () {

        const { colors, outerPixelCount, zeroColor } = this.store.getState();
        const color = colors.outer

        let unitsArray = new Array(outerPixelCount),
            actual = this.getMinutePixel(),
            index = 0,
            buf;

        for (; index < outerPixelCount ; index++ ) {
            if (index == actual) {
                buf = new Buffer(this.getColor(color))
            } else {
                buf = new Buffer(zeroColor)
            }
            unitsArray[index] = buf;
        }

        return Buffer.concat(unitsArray)
    }

    getInnerPixels (date) {

        const { colors, innerPixelCount, zeroColor } = this.store.getState();
        const color = colors.inner

        let unitsArray = new Array(innerPixelCount),
            actual = this.getHourPixel(),
            index = 0,
            buf;

        for (; index < innerPixelCount; index++ ) {
            if (index == actual) {
                buf = new Buffer(this.getColor(color))
            } else {
                buf = new Buffer(zeroColor)
            }
            unitsArray[index] = buf;
        }

        return Buffer.concat(unitsArray)
    }

}