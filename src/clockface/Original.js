const ClockFaceAbstract = require('./ClockFaceAbstract')

module.exports = class Original extends ClockFaceAbstract {

    constructor (config) {
        super(config)
    }

    getBuffer (date, next) {
        return next(Buffer.concat([
            this.getOuterPixels(date),
            this.getStubPixels(),
            this.getInnerPixels(date)
        ]))
    }

    getOuterPixels (date) {
        let unitsArray = new Array(this.config.OUTER),
            actual = this.getMinutePixel(date),
            index = 0,
            buf;

        for (; index < this.config.OUTER ; index++ ) {
            if (index == actual) {
                buf = new Buffer(this.getColor('outer', date))
            } else {
                buf = new Buffer(this.config.NONE_COLOR)
            }
            unitsArray[index] = buf;
        }

        return Buffer.concat(unitsArray)
    }

    getInnerPixels (date) {

        let unitsArray = new Array(this.config.INNER),
            actual = this.getHourPixel(date),
            index = 0,
            buf;

        for (; index < this.config.INNER; index++ ) {
            if (index == actual) {
                buf = new Buffer(this.getColor('inner', date))
            } else {
                buf = new Buffer(this.config.NONE_COLOR)
            }
            unitsArray[index] = buf;
        }

        return Buffer.concat(unitsArray)
    }

}



