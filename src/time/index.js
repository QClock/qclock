import log from '../log'
import * as actions from '../actions'

import dayjs from 'dayjs'

import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(utc)
dayjs.extend(timezone)

export default class Time {

    constructor (store) {
        this.store = store
        this.currentOffset = this.store.getState().utcOffset
        this.currentDate = this.store.getState().datetime

        let currentValue

        this.store.subscribe(() => {
            let previousValue = currentValue
            currentValue = this.store.getState().datetime
            if (previousValue !== currentValue) {
                this.update()
            }
        })
    }

    get current () {
        const {
            utcOffset,
            timezone
        } = this.store.getState()

        let time = new Date( +(new Date()) + utcOffset)
        time = dayjs(time).tz(timezone)

        return time;
    }

    update () {
        console.log('time update')
        const { datetime, utcOffset } = this.store.getState()

        if (this.currentDate === datetime) return

        this.currentDate = datetime

        const newUtcOffset = Time.getTimeOffset(datetime)
        this.store.dispatch(actions.setUtcOffset(newUtcOffset))
    }

    static getTimeOffset (year, month, day, hour, minute) {
        let current = new Date()
        let incoming

        if (!month && !day) {
            incoming = new Date(arguments[0]) // date from timestamp
        } else {
            incoming = new Date(year, month-1, day, hour, minute)
        }

        return incoming - current
    }
}
