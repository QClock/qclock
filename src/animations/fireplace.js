const hsl2rgb = require('../lib/util/hsl-to-rgb')

let name = 'Fireplace'
let frames = 60
let fps = 5

let outer = function (frameIndex, pixel, index) {
    return hsl2rgb(0, 0, 0)
}

let inner = function (frameIndex, pixel, index, pixels) {
    let saturation = 1
    let hue = 10

    if (Math.random() > 0.9) {
        hue = 30
    }

    let lightness = Math.random()

    if (lightness > 0.5) {
        lightness = lightness - 0.5
    }

    if (index < 7 || index > 49) {
        return hsl2rgb(hue, saturation, lightness)
    }

    return hsl2rgb(0, 0, 0)
}

module.exports = {
    name,
    fps,
    frames,
    outer,
    inner
}