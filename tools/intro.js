const hsl2rgb = require('../src/lib/util/hsl-to-rgb')
const RemoteAnimation = require('./RemoteAnimation')

//const REMOTE_URL = 'ws://192.168.1.101:8899'
const REMOTE_URL = 'ws://127.0.0.1:8899'

let frame_count = 300
let fps = 60

const anim = new RemoteAnimation(
    frame_count,
    fps,
    function outer (frameIndex, pixel, index, pixels) {



            let pixelcount = pixels.length
            let roundStepTime = 120 / pixelcount

            console.log(frameIndex, roundStepTime, Math.ceil(frameIndex / roundStepTime))

/*

0|      0
1|      1   0
2|      2   1   0
3|      3   2   1   0
4|      4   3   2   1   0
5|      5   4
6|      6   5
7|              5
8|
9|
-|      .1  .3  .5  .3  .1


*/
            let hue = 200
            let lightness = 0
            let saturation = 1
            let p2 = (frameIndex == index || (frameIndex - 4) == index)
            let p1 = ((frameIndex - 1) == index || (frameIndex - 3) == index)
            let p0 = (frameIndex - 2) == index


            if (p2) {
                lightness = 0.1
            }
            if (p1) {
                lightness = 0.3
            }
            if (p0) {
                lightness = 0.5
            }


            return hsl2rgb(hue, saturation, lightness)

            //return [255,255,255]//hsl2rgb(200, 0, 0.5)



//        return hsl2rgb(0, 0, 0)
    },
    function inner (frameIndex, pixel, index) {

        return hsl2rgb(0, 0, 0)
    }
)

anim.render(REMOTE_URL)