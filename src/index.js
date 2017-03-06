const fs = require('fs')
const packagejson = require('./package.json')
const config = require('./config.js')

const NeoPixels = require('./lib/npx.js')
const clockface = require('./clockface')
const tick = require('./lib/tick.js')
const getTimeOffset = require('./lib/util/getTimeOffset')

let connections = []

const getTime = function () {

    let time = new Date( +(new Date()) + config.NTP_OFFSET)

    time.setHours(time.getHours() + config.TIMEZONE_OFFSET)

    return time;
}

const next = function () {

   clockface.read(getTime(), function (buf) {

        if (config.USE_ADMIN) {
            server.setDisplayBuffer(buf)
        }

        let ui8 = new Uint8Array(buf.buffer, buf.byteOffset, buf.byteLength / Uint8Array.BYTES_PER_ELEMENT)

        npx.send(ui8)
    });
}

const npx = new NeoPixels()

npx.on('ready', function () {
    tick.start(next)
})

if (config.USE_NETWORK) {
    var Network = require('./lib/network.js')
    var network = new Network(config)
}

if (config.USE_ADMIN) {
    var Server = require('./server/')
    var server = new Server(config, tick, npx, network)
}

if (!config.TESSEL) {
    config.TIMEZONE_OFFSET = 0;
}

if (!config.NTP_OFFSET && packagejson.qclock.time) {
    config.NTP_OFFSET = getTimeOffset(packagejson.qclock.time)
}

if (config.USE_ADMIN) {
    network.on('ready', server.start.bind(server));
}

if (config.USE_NETWORK) {
    network.create();
}

process.on('uncaughtException', (err) => {
    fs.appendFileSync('error.log', `${(new Date()).toISOString()} Caught exception: ${err}` + "\n")
    fs.appendFileSync('error.log', "\t" + `${err.stack}` + "\n")
});
