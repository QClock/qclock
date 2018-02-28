const jsonBody = require("body/json")

import log from '../../log'
import * as actions from '../../actions'

export default function colors (store, request, response) {

    const {
        method
    } = request

    log.info('colors', method)

    if (method === 'GET') {
        return response.end(JSON.stringify({colors: store.getState().colors }))
    }

    if (method === 'PUT') {
        jsonBody(request, (err, body) => {
            if (err) {
                log.error(err)
                response.statusCode = 500
                return response.end()
            }

            const { colors } = body

            if (colors.inner[0] > 360) {
                colors.inner[0] = 360
            }

            if (colors.outer[0] > 360) {
                colors.outer[0] = 360
            }

            store.dispatch(actions.setColors(colors))
            return response.end(JSON.stringify({success: true}))
        })
    }
}