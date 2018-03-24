const jsonBody = require("body/json")

import log from '../../log'
import * as actions from '../../actions'

export default function colors (store, request, response) {

    const {
        method
    } = request

    log.info('datetime', method)

    if (method === 'GET') {
        const timezone = store.getState().timezone
        return response.end(JSON.stringify({ timezone }))
    }

    if (method === 'PUT') {
        jsonBody(request, (err, body) => {
            if (err) {
                log.error(err)
                response.statusCode = 500
                return response.end()
            }

            store.dispatch(actions.setTimeZone(body.timezone))
            return response.end(JSON.stringify({success: true}))
        })
    }

    if (method === 'SOCKET') {
        store.dispatch(actions.setTimeZone(request.timezone))
    }
}