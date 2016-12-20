const hsl2rgb = require('../src/lib/util/hsl-to-rgb')
const RemoteAnimation = require('./RemoteAnimation')

//const REMOTE_URL = 'ws://192.168.1.101:8899'
const REMOTE_URL = 'ws://127.0.0.1:8899'

let frame_count = 150
let fps = 10

const anim = new RemoteAnimation(
    frame_count,
    fps,
    function outer (frameIndex, pixel, index, pixels) {
        let hue = 200
        let lightness = 0
        let saturation = 1
        let p3 = (frameIndex - 5) == index || frameIndex == index
        let p2 = (frameIndex - 4) == index
        let p1 = ((frameIndex - 1) == index || (frameIndex - 3) == index)
        let p0 = (frameIndex - 2) == index

        if (p3) {
            lightness = 0.08
        }
        if (p2) {
            lightness = 0.15
        }
        if (p1) {
            lightness = 0.28
        }
        if (p0) {
            lightness = 0.5
        }

        return hsl2rgb(hue, saturation, lightness)

    },
    function inner (frameIndex, pixel, index) {

        return hsl2rgb(0, 0, 0)

    }
)

anim.render(REMOTE_URL)