const WebSocket = require('ws')
const hsl2rgb = require('../src/lib/util/hsl-to-rgb')

function getStubPixels () {
        // todo config stub-pixel-count
        return (new Buffer(6 * 3)).fill(0);
    }

//var ws = new WebSocket('ws://192.168.1.101:8899');
var ws = new WebSocket('ws://127.0.0.1:8899');

ws.on('open', function open() {


    let max_frames = 70
    let frame = 0

    let interval = setInterval(function () {
        if (frame == max_frames) {
            clearInterval(interval)
            ws.close();
            return;

        }

        let color = hsl2rgb(280, 1, 0.5)

        let out = (new Array(58)).fill(new Buffer([0,0,0]))
        let inn = (new Array(56)).fill(new Buffer([0,0,0]))

        if (frame > 7) {

            out = out.map((b, i)=>{

                if ((i + frame % 8) % 8 == 0) return new Buffer(color)

                return new Buffer([0,0,0])
            })

            inn = inn.map((b, i)=>{
                return new Buffer(color)
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