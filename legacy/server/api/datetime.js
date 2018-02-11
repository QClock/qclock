

const getTimeOffset = require('../../lib/util/getTimeOffset')

module.exports = function (request, response) {

    let { method } = request;

    if (method === 'GET') {
        // return current datetime settings
        response.end(JSON.stringify({
            timezone: this.config.TIMEZONE_OFFSET,
            datetime: +new Date(+new Date() + this.config.NTP_OFFSET)
        }))
    }

    if (method === 'PUT') {
        this.getRequestBody(request, (err, body) => {

            if (typeof body.timezone !== 'undefined') this.config.TIMEZONE_OFFSET = +body.timezone;

            if (typeof body.datetime !== 'undefined') this.config.NTP_OFFSET = getTimeOffset(+body.datetime);

            this.tick.now()

            response.end(JSON.stringify({
                timezone: this.config.TIMEZONE_OFFSET,
                datetime: +new Date(+new Date() + this.config.NTP_OFFSET)
            }))
        })
    }

}