const jsonBody = require("body/json")

import log from '../../log'
import * as actions from '../../actions'

export default function colors (store, request, response) {

    const {
        method
    } = request

    log.info('datetime', method)

    if (method === 'GET') {
        const time = store.getState().datetime
        return response.end(JSON.stringify({ time }))
    }

    if (method === 'PUT') {
        jsonBody(request, (err, body) => {
            if (err) {
                log.error(err)
                response.statusCode = 500
                return response.end()
            }

            store.dispatch(actions.setTime(body.time))
            return response.end(JSON.stringify({success: true}))
        })
    }

    if (method === 'SOCKET') {
        store.dispatch(actions.setTime(request.time))
    }
}