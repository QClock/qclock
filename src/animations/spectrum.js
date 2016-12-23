
const hsl2rgb = require('../lib/util/hsl-to-rgb')

let name = 'Spectrum'
let frames = 360
let fps = 30

let outer = function (frameIndex, pixel, index) {
    let hue = Math.round((index / 58) * 360)
    let step = hue + frameIndex

    if (step > 360){
        step = step - 360
    }

    return hsl2rgb(step, 1, 0.5)
}

let inner = function (frameIndex, pixel, index) {
    let hue = frameIndex
    let step = hue > 360 ? hue - 360 : hue;

    return hsl2rgb(step, 1, 0.5)
}

module.exports = {
    name,
    fps,
    frames,
    outer,
    inner
}