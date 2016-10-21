



function getStubPixels () {
    // todo config stub-pixel-count
    return (new Buffer(6 * 3)).fill(0);
}




module.exports = {
    name: "Full Pink",
    run: function (server, onFinish) {

        let outer = new Array(server.config.OUTER)
        let inner = new Array(server.config.INNER)

        let fillCondition = true

        for(let i = 0; i < server.config.OUTER; i++) {
            if (fillCondition) {
                outer[i] = new Buffer([255, 0, 255])
            } else {
                outer[i] = new Buffer(server.config.NONE_COLOR)
            }
        }

        for(let i = 0; i < server.config.INNER; i++) {
            if (fillCondition) {
                inner[i] = new Buffer([255, 0, 255])
            } else {
                inner[i] = new Buffer(server.config.NONE_COLOR)
            }
        }

        let buf = Buffer.concat([
            Buffer.concat(outer),
            getStubPixels(),
            Buffer.concat(inner)
        ])

        let interval, count = 0;

        interval = setInterval(function () {

            if (count == 10) {
                clearInterval(interval)
                return onFinish()
            }

            var ui8 = new Uint8Array(buf.buffer, buf.byteOffset, buf.byteLength / Uint8Array.BYTES_PER_ELEMENT);
            server.npx.send(ui8)
            server.setDisplayBuffer(buf)
            count++

        }, 45)



//        onFinish()
    }
}