
const OUTERCOLOR = 'outerColor'
const INNERCOLOR = 'innerColor'

// outer, minutes first, then inner, hours

export default class Original {


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
            this.getInnerPixels()
        ])
    }

    getOuterPixels () {

        const { colors, outerPixelCount, zeroColor } = this.store.getState();
        const color = colors.outer

        console.log('getOuterPixels', this.getMinutePixel())

        return Buffer.concat([])
    }

    getInnerPixels () {

        const { colors, innerPixelCount, zeroColor } = this.store.getState();
        const color = colors.inner

        console.log('getInnerPixels', this.getHourPixel())

        return Buffer.concat([])
    }

    getHourPixel () {
        const { innerPixelCount } = this.store.getState();

        const hour24 = this.date.hour()
        let hour12 = hour24

        if (hour12 > 12) {
            hour12 = hour24 - 12
        }

        const hourPixel = Math.round((innerPixelCount / 12) * hour12)
        const hourFragmentPixel = Math.floor(((innerPixelCount / 12) / 60) * this.date.minute())

// mindez igaz, ha fentrol indulna a nulla, de alulrol teszi

        return hourPixel + hourFragmentPixel
    }

    getMinutePixel () {
        const { outerPixelCount } = this.store.getState();
        return Math.ceil((outerPixelCount / 60) * this.date.minute())
    }

    getColor (hslColor) {
        let rgbColor = hsl2rgb(...hslColor)
        const { dim } = this.store.getState()

        if (
            dim.active &&
            (this.date.hour() > dim.from || this.date.hour() < dim.to)
        ) {
            let lightness = Math.round((dim.level / 100) * 50)
            rgbColor = hsl2rgb(hslColor[0], hslColor[1], lightness)
        }

        return rgbColor
    }

}