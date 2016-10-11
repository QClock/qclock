var packagejson = require('./package.json')
var config = require('./config/config.js')

// todo get setdatetime from package json


var NeoPixels = require('./lib/npx.js')
var OriginalClockFace = require('./clockface/original.js')

var clockface = new OriginalClockFace(config)
//var time = require('./clockface/original-spectrum.js')
//var time = require('./clockface/original-spectrum-fill.js')
var tick = require('./lib/tick.js')
let getTimeOffset = require('./lib/util/getTimeOffset')

var connections = [];

var npx = new NeoPixels()
npx.on('ready', function () {
    tick.start(next)
})


if (config.USE_NETWORK) {
    //var ntp = require('./lib/ntp.js')
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




function getTime () {
    var t = new Date( +(new Date()) + config.NTP_OFFSET);

    t.setHours(t.getHours() + config.TIMEZONE_OFFSET);

    console.log(t)

    return t;
}

function next () {

   clockface.getBuffer(getTime(), function (buf) {

        if (config.USE_ADMIN) {
            server.setDisplayBuffer(buf)
        }

        var ui8 = new Uint8Array(buf.buffer, buf.byteOffset, buf.byteLength / Uint8Array.BYTES_PER_ELEMENT);

        npx.send(ui8);
    });
}



if (!config.TESSEL) {
    var WebSocketServer = require('ws').Server,
        wss = new WebSocketServer({ port: 8080 });

    wss.on('connection', function connection(ws) {
        connections.push(ws)
        next()
    });
}

if (config.USE_ADMIN) {
    network.on('ready', server.start.bind(server));
    //network.on('error', server.disconnect.bind(server));
}

if (config.USE_NETWORK) {
    //network.on('ready', (settings) => {console.trace(); console.log(settings)});
    network.create();
}