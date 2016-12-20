const WebSocket = require('ws')
const hsl2rgb = require('../src/lib/util/hsl-to-rgb')

//var ws = new WebSocket('ws://192.168.1.101:8899');
var ws = new WebSocket('ws://127.0.0.1:8899');
ws.on('message', (msg) => {
    console.log(msg)
    if (msg === 'finished') ws.close()
})

let frame_count = 360
let fps = 30

const RemoteAnimation = require('./RemoteAnimation')

new RemoteAnimation(
    frame_count,
    fps,
    function outer (frameIndex, outerPixel, innerPixelIndex) {},
    function inner (frameIndex, innerPixel, outerPixelIndex) {}
)

ws.on('open', function open() {

    const anim = new RemoteAnimation(
        frame_count,
        fps,
        function outer (frameIndex, pixel, index) {
            let hue = Math.round((index / 58) * 360)
            let step = hue + frameIndex

            if (step > 360){
                step = step - 360
            }

            return hsl2rgb(step, 1, 0.5)
        },
        function inner (frameIndex, pixel, index) {
            let hue = frameIndex
            let step = hue > 360 ? hue - 360 : hue;

            return hsl2rgb(step, 1, 0.5)
        }
    )

    ws.on('message', (msg) => {
        if (msg === 'finished') ws.close();
    })

    ws.send(anim.render())

});