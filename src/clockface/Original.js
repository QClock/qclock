import hsl2int from '../lib/hsl2int'

export default class Original {

    constructor (store) {
        this.store = store
    }

    render (date) {
        this.date = date
        return this.getBuffer()
    }

    getBuffer (next) {
        return Uint32Array.from([
            ...this.getOuterPixels(),
            ...this.getInnerPixels()
        ])
    }

    getOuterPixels () {
        const { colors, outerPixelCount } = this.store.getState();
        const color = colors.outer
        const output = new Uint32Array(outerPixelCount)

        output[this.getMinutePixel()] = hsl2int(...this.dim(...color))

        return output
    }

    getInnerPixels () {
        const { colors, innerPixelCount } = this.store.getState();
        const color = colors.inner
        const output = new Uint32Array(innerPixelCount)

        output[this.getHourPixel()] = hsl2int(...this.dim(...color))

        return output
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
        const index = hourPixel + hourFragmentPixel

        let rotatedIndex = index + (innerPixelCount / 2)
        if (rotatedIndex > innerPixelCount) {
            rotatedIndex = rotatedIndex - innerPixelCount
        }
        return rotatedIndex
    }

    getMinutePixel () {
        const { outerPixelCount } = this.store.getState();
        const index = Math.ceil((outerPixelCount / 60) * this.date.minute())

        let rotatedIndex = index + (outerPixelCount / 2)
        if (rotatedIndex > outerPixelCount) {
            rotatedIndex = rotatedIndex - outerPixelCount
        }

        return rotatedIndex
    }

    dim (h,s,l) {
        const { dim } = this.store.getState()

        if (
            dim.active &&
            (this.date.hour() > dim.from || this.date.hour() < dim.to)
        ) {
            let lightness = Math.round((dim.level / 100) * 50)
            return [h, s, lightness]
        }

        return [h,s,l]
    }
}