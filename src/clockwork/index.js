import log from '../log'

export default class ClockWork {

    constructor (store) {
        this.store = store
        this.tick_interval = 0
        this.paused = false
        this.callback = () => {}
        this.store.subscribe(() => this.now(this.callback))
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