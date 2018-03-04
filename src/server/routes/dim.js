const jsonBody = require("body/json")

import log from '../../log'
import * as actions from '../../actions'

export default function dim (store, request, response) {

    const {
        method
    } = request

    log.info('dim', method)

    if (method === 'GET') {
        return response.end(JSON.stringify(store.getState().dim))
    }

    if (method === 'PUT') {
        jsonBody(request, (err, body) => {
            if (err) {
                log.error(err)
                response.statusCode = 500
                return response.end()
            }

            store.dispatch(actions.setDim(body))
            return response.end(JSON.stringify({success: true}))
        })
    }

    if (method === 'SOCKET') {
        store.dispatch(actions.setDim(request.dim))
    }
}