/**
 * @param {Float} percent
 * @param {Array} color
 */
export default function dimRGB (percent, color) {

    let rgb = color.map((component, i) => {
        return Math.round(component * percent)
    })

    return rgb;

}