import log from '../log'
import * as actions from '../actions'

export default class Time {

    constructor (store) {
        this.store = store
        this.currentOffset = this.store.getState().utcOffset;
        this.currentDate = this.store.getState().datetime;
        this.store.subscribe(() => this.update())
    }

    get current () {
        const {
            utcOffset,
            timezone
        } = this.store.getState()

        let time = new Date( +(new Date()) + utcOffset)
        time.setHours(time.getHours() + timezone)

        return time;
    }

    update () {
        const { datetime, utcOffset } = this.store.getState()

        if (this.currentDate === datetime) return;

        this.currentDate = datetime;

        const newUtcOffset = getTimeOffset(datetime)
        this.store.dispatch(actions.setUtcOffset(newUtcOffset))
    }
}

const getTimeOffset = function (year, month, day, hour, minute) {
    let current = new Date()
    let incoming

    if (!month && !day) {
        incoming = new Date(arguments[0]) // date from timestamp
    } else {
        incoming = new Date(year, month-1, day, hour, minute)
    }

    return incoming - current;
}
