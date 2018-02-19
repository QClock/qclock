import log from '../log'


const needImmediateTick = function (newState, oldState) {
    const props = [
        'utcOffset',
        'colors',
        'dim',
        'timezone'
    ]

    return props.reduce((bool, prop) => {
        if (bool) return bool;
        return JSON.stringify(newState[prop]) != JSON.stringify(oldState[prop])
    }, false)
}

export default class ClockWork {

    constructor (store) {
        this.store = store
        this.tick_interval = 0
        this.paused = false
        this.callback = () => {}

        this.currentState = this.store.getState()

        this.store.subscribe(() => this.update())
    }

    update () {
        const state = this.store.getState()

        if (needImmediateTick(state, this.currentState)) {
            this.now(this.callback) 
        }

        this.currentState = state
    }

    start (next) {
        this.callback = next
        next()
        this.run(next)
    }

    run (next) {
        const { interval } = this.store.getState()
        this.tick_interval = setInterval(() => {
            if (!this.paused) this.callback()
        }, interval)
    }

    pause () {
        this.paused = true
    }

    resume () {
        this.paused = false
    }

    reset () {
        clearInterval(this.tick_interval)
    }

    now (next) {
        log.info('run clockwork callback now')
        clearInterval(this.tick_interval)
        this.start(next)
    }
}