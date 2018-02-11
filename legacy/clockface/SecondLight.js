const ClockFaceAbstract = require('./ClockFaceAbstract')

const COLOR = 'color'
const LUMINOSITY = 'desaturate'


const fields = {
    [COLOR]: {
        'type': 'color',
        'label': 'Colors for both arms',
        'value': [270, 100, 50] // hsl
    },
    [LUMINOSITY]: {
        'type': 'slider',
        'label': 'Luminosity for pair color',
        'value': 50,
		'min': 0,
		'max': 100
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
        let color = this.config.CLOCKFACE[COLOR];

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

    getInnerPixels () {

        let color = this.config.CLOCKFACE[COLOR].slice(0)

        color[2] = this.config.CLOCKFACE[LUMINOSITY]

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