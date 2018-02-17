const jsonBody = require("body/json")

import log from '../../log'
import * as actions from '../../actions'

export default function colors (store, request, response) {

    const {
        method
    } = request

    log.info('datetime', method)

    if (method === 'GET') {
        return response.end(JSON.stringify(store.getState().timezone))
    }

    if (method === 'PUT') {
        jsonBody(request, (err, body) => {
            if (err) {
                log.error(err)
                response.statusCode = 500
                return response.end()
            }

            store.dispatch(actions.setTimeZone(body))
            return response.end(JSON.stringify({success: true}))
        })
    }
}