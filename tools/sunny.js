


const hsl2rgb = require('../src/lib/util/hsl-to-rgb')
const RemoteAnimation = require('./RemoteAnimation')

const REMOTE_URL = 'ws://192.168.1.101:8899'
//const REMOTE_URL = 'ws://127.0.0.1:8899'

let frame_count = 60
let fps = 30
let color = hsl2rgb(70, 1, 0.5)

const anim = new RemoteAnimation(
    frame_count,
    fps,
    function outer (frameIndex, pixel, index, pixels) {
        if ((index + frameIndex % 8) % 8 == 0) return color

        return hsl2rgb(0, 0, 0)
    },
    function inner (frameIndex, pixel, index, pixels) {
        return color
    }
)

anim.render(REMOTE_URL)