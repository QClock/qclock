
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

    SERVER_PORT: port,

    INTERVAL: 1000,

    NTP_OFFSET: 0,
    TIMEZONE_OFFSET: 2,
    HW_LAG: 0,

    OUTER: 58,
    INNER: 56,

    OUTER_COLOR: [255,0,228], // pink RGB
    INNER_COLOR: [53,225,40], //  zold RGBGB

    NONE_COLOR: [0,0,0],

    DIM_ENABLED: true,
    DIM_FROM: 20,
    DIM_TO: 6,
    DIM_LEVEL: 0.1,

    DIM_PREVIEW: false,

    CLOCKFACE: {}
}