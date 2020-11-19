const jsonBody = require("body/json")

import log from '../../log'
import * as actions from '../../actions'

export default function color (store, request, response) {

    const {
        method
    } = request

    log.info('color', method)

    if (method === 'GET') {
        return response.end(JSON.stringify({color: store.getState().color }))
    }

    if (method === 'PUT') {
        jsonBody(request, (err, body) => {
            if (err) {
                log.error(err)
                response.statusCode = 500
                return response.end()
            }

            const { color } = body

            if (color.hour[0] > 360) {
                color.hour[0] = 360
            }

            if (color.minute[0] > 360) {
                color.minute[0] = 360
            }

            store.dispatch(actions.setColor(color))
            return response.end(JSON.stringify({success: true}))
        })
    }

    if (method === 'SOCKET') {
        store.dispatch(actions.setColor(request.color))
    }
}