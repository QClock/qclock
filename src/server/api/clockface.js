
var clockfaces = require('../../clockface')

const rgbToArray = function (rgb) {
    return [0,0,0].map((val,i)=>parseInt(rgb.substr((i % 3) * 2,2),16));
}

const toHex = (prev, current) => {let hex = current.toString(16); return prev + (hex.length < 2 ? (0 + hex) : hex)}

const getValues = function (server) {

	let clockfaceFields = clockfaces.current.fields;
	let fields = {}

	for (let field of Object.keys(clockfaceFields)) {
		if (server.config.CLOCKFACE[field]) {
			fields[field] = server.config.CLOCKFACE[field].reduce(toHex, '')
		} else {
			fields[field] = clockfaceFields[field].value
		}
	}

	let dim = {
		dimEnabled: server.config.DIM_ENABLED,
		dimLevel: server.config.DIM_LEVEL * 100,
		dimFrom: server.config.DIM_FROM,
		dimTo: server.config.DIM_TO
	}

	return Object.assign(fields, dim, { clockface: clockfaceFields })

}

module.exports = function (request, response) {

    let { method } = request;

// in / out : RGB
	console.log(clockfaces)
	console.log(clockfaces.current)


    if (method === 'GET') {

        // return current datetime settings
        response.end(JSON.stringify(getValues(this)))
    }

    if (method === 'PUT') {
        this.getRequestBody(request, (err, body) => {

        	let clockfaceFields = clockfaces.current.fields;

			for (let field of Object.keys(clockfaceFields)) {
				this.config.CLOCKFACE[field] = rgbToArray(body[field])
			}

            this.config.DIM_ENABLED = body.dimEnabled === 'true'
            this.config.DIM_LEVEL = +body.dimLevel / 100
            this.config.DIM_FROM = +body.dimFrom
            this.config.DIM_TO = + body.dimTo

            this.tick.now()



            response.end(JSON.stringify(getValues(this)))
        })
    }

}