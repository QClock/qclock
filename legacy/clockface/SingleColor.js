const ClockFaceAbstract = require('./ClockFaceAbstract')

const COLOR = 'color'


const fields = {
    [COLOR]: {
        'type': 'color',
        'label': 'Color',
        'value': [270, 100, 50] // hsl
    }
}

module.exports = class Original extends ClockFaceAbstract {

    constructor (config) {
        super(config)
		this.setDefaults(fields)
    }

    get name () {
    	return 'Single Color'
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