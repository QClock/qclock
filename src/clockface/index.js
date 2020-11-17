import Original from './Original'
import * as actions from '../actions'

export default class Clockface {

    constructor (store, time, neopixels) {

        this.npx = neopixels
        this.time = time
        this.store = store
        this.clockfaceList = [
            new Original(store),
        ]

        this.currentIndex = 0
    }

    render () {
        const data = this.current.render(this.time.current)

        this.store.dispatch(actions.setPixels(data))
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