const config = require('../config.js')
let tick_interval = 0
let paused = false

module.exports = (function () {

    var cb

    function start (next) {
        next()
        run(next)
    }

    function run (next) {
        tick_interval = setInterval(function () {
            if (!paused) cb()
        }, config.INTERVAL)
    }

    function pause () {
        paused = true
    }

    function resume () {
        paused = false
    }

    function reset () {
        clearInterval(tick_interval)
    }

    function now () {
        clearInterval(tick_interval)
        start(cb)
    }

    return {
        now: now,
        start: start,
        pause: pause,
        resume: resume,
        reset: reset
    }



})()