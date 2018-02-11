const dim = require('../lib/util/dim')

module.exports = class ClockFaceAbstract {

    constructor (config) {
        this.config = config
    }

	get name () {
		return '-- you should override this --'
	}

	get fields () {
		return {}
	}

    read (date, callback) {
    	this.date = date
		this.getBuffer(callback)
	}

	getBuffer (next) {
		return next(Buffer.concat([
			this.getOuterPixels(),
			this.getStubPixels(),
			this.getInnerPixels()
		]))
	}

	setDefaults (fields) {
		Object.keys(fields).forEach((field) => {
			if (!this.config.CLOCKFACE[field]) {
				this.config.CLOCKFACE[field] = fields[field].value
			}
		})
	}

    getColor (hslColor) {
		hslColor = hslColor.map((c, i) => {
			if (i) return c / 100;
			return c
		})
    	let rgbColor = this.hslToRgb(...hslColor)

        if (this.config.DIM_PREVIEW ||
            (
                this.config.DIM_ENABLED &&
                this.config.DIM_FROM && this.config.DIM_TO &&
                (this.date.getHours() > this.config.DIM_FROM || this.date.getHours() < this.config.DIM_TO)
            )
        ) {
			rgbColor = dim(this.config.DIM_LEVEL, rgbColor)
        }

        return rgbColor
    }

	hslToRgb (hue, saturation, lightness){
		// based on algorithm from http://en.wikipedia.org/wiki/HSL_and_HSV#Converting_to_RGB
		if( hue == undefined ){
			return [0, 0, 0];
		}

		var chroma = (1 - Math.abs((2 * lightness) - 1)) * saturation;
		var huePrime = hue / 60;
		var secondComponent = chroma * (1 - Math.abs((huePrime % 2) - 1));

		huePrime = Math.floor(huePrime);
		var red;
		var green;
		var blue;

		if( huePrime === 0 ){
			red = chroma;
			green = secondComponent;
			blue = 0;
		}else if( huePrime === 1 ){
			red = secondComponent;
			green = chroma;
			blue = 0;
		}else if( huePrime === 2 ){
			red = 0;
			green = chroma;
			blue = secondComponent;
		}else if( huePrime === 3 ){
			red = 0;
			green = secondComponent;
			blue = chroma;
		}else if( huePrime === 4 ){
			red = secondComponent;
			green = 0;
			blue = chroma;
		}else if( huePrime === 5 ){
			red = chroma;
			green = 0;
			blue = secondComponent;
		}

		var lightnessAdjustment = lightness - (chroma / 2);
		red += lightnessAdjustment;
		green += lightnessAdjustment;
		blue += lightnessAdjustment;

		return [Math.round(red * 255), Math.round(green * 255), Math.round(blue * 255)];
	};

    getMinutePixel () {
        // get the actual pixel that closest to the current minute
        let actual = Math.round(( this.config.OUTER / 60 ) * this.date.getMinutes() )

        // the 0 is the 28th index on OUTER
        actual = actual + 29

        if (actual >= this.config.OUTER) {
            actual = actual - this.config.OUTER
        }

        return actual
    }

    getHourPixel () {
        let hours = this.date.getHours()
        let minutes = this.date.getMinutes()
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
