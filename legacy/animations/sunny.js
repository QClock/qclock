const hsl2rgb = require('../lib/util/hsl-to-rgb')
const color = hsl2rgb(70, 1, 0.5)

let name = 'Sunny'
let frames = 60
let fps = 30

let outer = function (frameIndex, pixel, index) {
    if ((index + frameIndex % 8) % 8 == 0) return color

    return hsl2rgb(0, 0, 0)
}

let inner = function (frameIndex, pixel, index, pixels) {
    return color
}

module.exports = {
    name,
    fps,
    frames,
    outer,
    inner
}