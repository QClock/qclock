let port = 80

if (process.env.NODE_ENV === 'docker') {
    port = 9090
}

export default {

    // clock data

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

    interval: 1000,
    outerPixelCount: 58,
    innerPixelCount: 56,
    stubPixelCount: 6,
    zeroColor: [ 0, 0, 0],
    network: {
        websocketPort: 8088,
        ssid: 'QCLOCK-dev',
        security: '',
        password: '',
        port
    }
}