const WebSocket = require('ws')
const Animation = require('./Animation')

module.exports = class RemoteAnimation extends Animation {
    constructor (frame_count, fps, outerIterator, innerIterator, stubPixels = 6) {
        super(frame_count, fps, outerIterator, innerIterator, stubPixels)
    }

    render (url) {
        let data = super.render()

        let ws = new WebSocket(url);

        ws.on('open', function open() {
            ws.on('message', (msg) => {
                if (msg === 'finished') ws.close();
            })

            ws.send(data)
        });
    }
}

