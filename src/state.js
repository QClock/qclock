export default {

    // clock data

    outerPixelCount: 58,
    innerPixelCount: 56,
    color: {
        hour: [ 230, 100, 50 ],
        minute: [ 130, 100, 50 ]
    },
    datetime: +new Date(),
    dim: {
        from: 21,
        to: 6,
        level: 30,
        active: false
    },
    timezone: 'Europe/Budapest',
    advanced: {
        useSocket: false
    },

    // internal

    utcOffset: 0,
    interval: 1000,
    stubPixelCount: 6,
    zeroColor: [ 0, 0, 0],
    pixels: new Uint32Array( 58 + 56 )
}