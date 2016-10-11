const rgbToArray = function (rgb) {
    return [0,0,0].map((val,i)=>parseInt(rgb.substr((i % 3) * 2,2),16));
}

module.exports = function (request, response) {

    let { method } = request;

// in / out : RGB
    let toHex = (prev, current) => {let hex = current.toString(16); return prev + (hex.length < 2 ? (0 + hex) : hex)}


    if (method === 'GET') {
        // return current datetime settings
        response.end(JSON.stringify({
            outerColor: this.config.OUTER_COLOR.reduce(toHex, ''),
            innerColor: this.config.INNER_COLOR.reduce(toHex, ''),
            dimEnabled: this.config.DIM_ENABLED,
            dimLevel: this.config.DIM_LEVEL * 100,
            dimFrom: this.config.DIM_FROM,
            dimTo: this.config.DIM_TO
        }))
    }

    if (method === 'PUT') {
        this.getRequestBody(request, (err, body) => {

            //console.log(body)

            this.config.OUTER_COLOR = rgbToArray(body.outerColor);
            this.config.INNER_COLOR = rgbToArray(body.innerColor);
            this.config.DIM_ENABLED = body.dimEnabled === 'true'
            this.config.DIM_LEVEL = +body.dimLevel / 100
            this.config.DIM_FROM = +body.dimFrom
            this.config.DIM_TO = + body.dimTo

            this.tick.now()

            response.end(JSON.stringify({
                outerColor: this.config.OUTER_COLOR.reduce(toHex, ''),
                innerColor: this.config.INNER_COLOR.reduce(toHex, ''),
                dimEnabled: this.config.DIM_ENABLED,
                dimLevel: this.config.DIM_LEVEL * 100,
                dimFrom: this.config.DIM_FROM,
                dimTo: this.config.DIM_TO
            }))
        })
    }

}