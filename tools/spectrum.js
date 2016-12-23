const RemoteAnimation = require('./RemoteAnimation')
const hsl2rgb = require('../src/lib/util/hsl-to-rgb')

const REMOTE_URL = 'ws://192.168.1.101:8899'
//const REMOTE_URL = 'ws://127.0.0.1:8899'

let frame_count = 60
let fps = 30

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
        return hsl2rgb(0,0,0)
    }
)
anim.render(REMOTE_URL)