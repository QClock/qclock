const URL = require('url')


import store from '../../store'

import datetime from './datetime'
import colors from './colors'
import dim from './dim'
import timezone from './timezone'

const routes = [
    {
        path: '/datetime',
        handler: datetime
    },
    {
        path: '/colors',
        handler: colors
    },
    {
        path: '/dim',
        handler: dim
    },
    {
        path: '/timezone',
        handler: timezone
    }
]

function isApiCall (url) {
    return /^\/api/.test(url.pathname)
}

export function match (url) {

    if (!isApiCall(url)) return false

    const apiPath = url.pathname.replace(/^\/api/, '')

    return routes.filter(route => route.path === apiPath).length > 0
}

export function handle (request, response) {
    const url = URL.parse(request.url)
    const path = url.pathname.replace(/^\/api/, '')

    const handler = routes.reduce((fn, route) => {
        if (route.path === path) return route.handler

        return fn
    }, () => {})

    return handler(store, request, response)
}