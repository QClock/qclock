
var clockfaces = require('../../clockface')

const getValues = function (server) {

	let clockfaceFields = clockfaces.current.fields;
	let fields = {}

	for (let field of Object.keys(clockfaceFields)) {
		if (server.config.CLOCKFACE[field] && clockfaceFields[field].type == 'color') {
			fields[field] = server.config.CLOCKFACE[field]
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

	let clockfaceData = {
		list: clockfaces.list.map((cf) => cf.name),
		current: clockfaces.current.name,
		fields: clockfaceFields
	}

	return Object.assign(fields, dim, { clockface: clockfaceData })

}

module.exports = function (request, response) {

    let { method } = request;

	// color in / out : HSL

    if (method === 'GET') {
        // return current datetime settings
        response.end(JSON.stringify(getValues(this)))
    }

    if (method === 'PUT') {
        this.getRequestBody(request, (err, body) => {
			if (body.clockface) {
				clockfaces.current = body.clockface
				this.tick.now()
				response.end(JSON.stringify(getValues(this)))
				return;
			}

        	let clockfaceFields = clockfaces.current.fields;

			for (let field of Object.keys(clockfaceFields)) {
				if (clockfaceFields[field].type === 'color') {
					this.config.CLOCKFACE[field] = body[`${field}[]`].map((i)=> +i)
				} else {
					this.config.CLOCKFACE[field] = body[field]
				}
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