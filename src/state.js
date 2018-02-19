export default {
    utcOffset: 0,
    colors: {
        inner: [ 230 , 100, 50 ],
        outer: [ 130 , 100, 50 ]
    },
    datetime: +new Date(),
    dim: {
        from: 21,
        to: 6,
        level: 30,
        active: false
    },
    timezone: 1,

    // internal stuff
    interval: 1000,
    outerPixelCount: 58,
    innerPixelCount: 56,
    stubPixelCount: 6,
    zeroColor: [ 0, 0, 0],
    network: {
        ssid: 'QCLOCK',
        security: '',
        password: '',
        port: 80
    }
}