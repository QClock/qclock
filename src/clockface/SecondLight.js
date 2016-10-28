const ClockFaceAbstract = require('./ClockFaceAbstract')

const COLOR = 'color'
const DESATURATE = 'desaturate'


const fields = {
    [COLOR]: {
        'type': 'color',
        'label': 'Colors for both arms',
        'value': [255, 0, 255]
    },
    [DESATURATE]: {
        'type': 'slider',
        'label': 'Saturation for pair color',
        'value': 70
    }
}

module.exports = class SecondLight extends ClockFaceAbstract {

    constructor (config) {
        super(config)
		this.setDefaults(fields)
    }

    get name () {
    	return 'Second Light'
	}

    get fields () {
        return fields
    }

    getOuterPixels () {
        let color = this.config.CLOCKFACE[COLOR]

        let unitsArray = new Array(this.config.OUTER),
            actual = this.getMinutePixel(),
            index = 0,
            buf;

        for (; index < this.config.OUTER ; index++ ) {
            if (index == actual) {
                buf = new Buffer(this.getColor(color))
            } else {
                buf = new Buffer(this.config.NONE_COLOR)
            }
            unitsArray[index] = buf;
        }

        return Buffer.concat(unitsArray)
    }

    getInnerPixels (date) {
        let color = this.config.CLOCKFACE[COLOR]
        let unitsArray = new Array(this.config.INNER),
            actual = this.getHourPixel(),
            index = 0,
            buf;

        for (; index < this.config.INNER; index++ ) {
            if (index == actual) {
                buf = new Buffer(this.getColor(color))
            } else {
                buf = new Buffer(this.config.NONE_COLOR)
            }
            unitsArray[index] = buf;
        }

        return Buffer.concat(unitsArray)
    }

}