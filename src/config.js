const packagejson = require('./package.json')

export default {

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