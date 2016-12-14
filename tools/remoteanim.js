const WebSocket = require('ws')

function getStubPixels () {
        // todo config stub-pixel-count
        return (new Buffer(6 * 3)).fill(0);
    }

var ws = new WebSocket('ws://192.168.1.101:8899');

ws.on('open', function open() {


    let max_frames = 60
    let frame = 0

    let interval = setInterval(function () {
        if (frame == max_frames) {
            clearInterval(interval)
            ws.close();
            return;
        }




        let out = (new Array(58)).fill(new Buffer([0,0,0]))
        let inn = (new Array(56)).fill(new Buffer([0,0,0]))
        if (frame < 58) {
            out = out.map((b, i)=>{

                if (i <= frame) return new Buffer([0,0,255])

                return new Buffer([0,0,0])
            })

            inn = inn.map((b, i)=>{
                if (i <= frame) return new Buffer([255,0,255])

                return new Buffer([0,0,0])
            })

        } else {
            out = out.map((b, i)=>{
                return new Buffer([0,0,120])
            })

            inn = inn.map((b, i)=>{
                return new Buffer([120,0,120])
            })
        }






        let buf = Buffer.concat([
            Buffer.concat(out),
            getStubPixels(),
            Buffer.concat(inn)
        ])

        ws.send(buf, { binary: true, mask: true })

        frame++
    }, 40)

});