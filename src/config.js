
var packagejson = require('./package.json')
var tessel = true;
var port = 80
var skip_facedandy = false

if (process.env.QTEST) {
    tessel = false;
    port = 8889
    skip_facedandy = true
}

module.exports = {

    USE_ADMIN: true,
    USE_NETWORK: true,
    SKIP_FADECANDY: skip_facedandy,

    TESSEL: tessel,
    SERVER_PORT: port,

    INTERVAL: 1000,

    NTP_OFFSET: 0,
    TIMEZONE_OFFSET: 2,
    HW_LAG: 0,

    OUTER: 58,
    INNER: 56,

    //OUTER_COLOR: [126,60,216], // lila RGB
    //INNER_COLOR: [255,152,0], // sarga RGB

    OUTER_COLOR: [255,0,228], // pink RGB
    INNER_COLOR: [53,225,40], //  zold RGB

    //OUTER_COLOR: [255,138,0], // narancs RGB
    //INNER_COLOR: [0,26,225], //  kek RGB

    //OUTER_COLOR: [10,255,0], // zold RGB
    //INNER_COLOR: [255,247,0], // sarga RGB


    //OUTER_COLOR: [225,0,53], // piros RGB
    //INNER_COLOR: [166,212,255], // 'ezust' RGB

    NONE_COLOR: [0,0,0],

    DIM_ENABLED: true,
    DIM_FROM: 20,
    DIM_TO: 6,
    DIM_LEVEL: 0.1,

    DIM_PREVIEW: false,

    NETWORK: packagejson.qclock.network,

    CLOCKFACE: {}
}