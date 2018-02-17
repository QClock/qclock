import Original from './Original'
import NeoPixels from './../neopixels'


export default class Clockface {

    constructor (store, time) {

        this.npx = new NeoPixels();
        this.time = time
        this.clockfaceList = [
            new Original(store),
        ]

        this.currentIndex = 0
    }

    render () {
        const data = this.current.render(this.time.current)
        this.npx.send(data)
    }

    get list () {
        return this.clockfaceList
    }

    set current (name) {
        this.currentIndex = this.clockfaceList.reduce((collect, item, index) => {
            if (item.name === name) return index;

            return collect
        }, 0)
    }

    get current () {
        return this.clockfaceList[this.currentIndex]
    }
}