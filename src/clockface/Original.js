const ClockFaceAbstract = require('./ClockFaceAbstract')

const OUTERCOLOR = 'outerColor'
const INNERCOLOR = 'innerColor'

const fields = {
    [OUTERCOLOR]: {
        'type': 'color',
        'label': 'Outer color',
        'value': [255, 0, 255]
    },
    [INNERCOLOR]: {
        'type': 'color',
        'label': 'Inner color',
        'value': [0, 255, 0]
    }
}

module.exports = class Original extends ClockFaceAbstract {

    constructor (config) {
        super(config)
		this.setDefaults(fields)
    }

    static get fields () {
        return fields
    }

    getOuterPixels () {
        let unitsArray = new Array(this.config.OUTER),
            actual = this.getMinutePixel(),
            index = 0,
            buf;

        for (; index < this.config.OUTER ; index++ ) {
            if (index == actual) {
                buf = new Buffer(this.getColor(OUTERCOLOR))
            } else {
                buf = new Buffer(this.config.NONE_COLOR)
            }
            unitsArray[index] = buf;
        }

        return Buffer.concat(unitsArray)
    }

    getInnerPixels (date) {

        let unitsArray = new Array(this.config.INNER),
            actual = this.getHourPixel(),
            index = 0,
            buf;

        for (; index < this.config.INNER; index++ ) {
            if (index == actual) {
                buf = new Buffer(this.getColor(INNERCOLOR))
            } else {
                buf = new Buffer(this.config.NONE_COLOR)
            }
            unitsArray[index] = buf;
        }

        return Buffer.concat(unitsArray)
    }

}