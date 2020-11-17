let port = 8080

export default {

    // clock data

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
    timezone: 'Europe/Budapest',
    advanced: {
        useSocket: false
    },

    // client config

    clientConfig: {
        API_PORT: port,
        PUT_RATELIMIT: 0,
        WS_PORT: 8088
    },

    // internal

    utcOffset: 0,
    interval: 1000,
    outerPixelCount: 56,
    innerPixelCount: 56,
    stubPixelCount: 6,
    zeroColor: [ 0, 0, 0],
    network: {
        websocketPort: 8088,
        ssid: 'QCLOCK',
        security: '',
        password: '',
        port
    },
    pixels: new Uint32Array( 112 )
}