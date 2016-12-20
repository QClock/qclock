const hsl2rgb = require('../src/lib/util/hsl-to-rgb')
const RemoteAnimation = require('./RemoteAnimation')

const REMOTE_URL = 'ws://192.168.1.101:8899'
//const REMOTE_URL = 'ws://127.0.0.1:8899'

let frame_count = 60
let fps = 5

const anim = new RemoteAnimation(
    frame_count,
    fps,
    function outer (frameIndex, pixel, index, pixels) {

        return hsl2rgb(0, 0, 0)
    },
    function inner (frameIndex, pixel, index, pixels) {

        let hue = 10

        if (Math.random() > 0.9) {
            hue = 30
        }
        let saturation = 1
        let lightness = Math.random()
        if (lightness > 0.5) {
            lightness = lightness - 0.5
        }

        console.log(index, pixels.length)

        if (index < 7 || index > 49) {
            return hsl2rgb(hue, saturation, lightness)
        }
        return hsl2rgb(0, 0, 0)
    }
)

anim.render(REMOTE_URL)