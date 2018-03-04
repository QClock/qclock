const jsonBody = require("body/json")

import log from '../../log'
import * as actions from '../../actions'

export default function advanced (store, request, response) {

    const {
        method
    } = request

    log.info('advanced', method)

    if (method === 'GET') {
        return response.end(JSON.stringify(store.getState().advanced))
    }

    if (method === 'PUT') {
        jsonBody(request, (err, body) => {
            if (err) {
                log.error(err)
                response.statusCode = 500
                return response.end()
            }

            store.dispatch(actions.setAdvanced(body))
            return response.end(JSON.stringify({success: true}))
        })
    }

    if (method === 'SOCKET') {
        store.dispatch(actions.setAdvanced(request.advanced))
    }
}