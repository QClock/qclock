/**
 * @param {Float} percent
 * @param {Array} color
 */
module.exports = function dim (percent, color) {

    let rgb = color.map((component, i) => {
        return Math.round(component * percent)
    })

    return rgb;

}