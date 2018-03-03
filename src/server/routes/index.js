const URL = require('url')

import datetime from './datetime'
import colors from './colors'
import dim from './dim'
import timezone from './timezone'
import advanced from './advanced'

const routes = [
    {
        name: 'datetime',
        path: '/datetime',
        handler: datetime
    },
    {
        name: 'colors',
        path: '/colors',
        handler: colors
    },
    {
        name: 'dim',
        path: '/dim',
        handler: dim
    },
    {
        name: 'timezone',
        path: '/timezone',
        handler: timezone
    },
    {
        name: 'advanced',
        path: '/advanced',
        handler: advanced
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

export function handle (store, request, response) {
    const url = URL.parse(request.url)
    const path = url.pathname.replace(/^\/api/, '')

    const handler = routes.reduce((fn, route) => {
        if (route.path === path) return route.handler

        return fn
    }, () => {})

    response.setHeader('Access-Control-Allow-Origin', '*')

    return handler(store, request, response)
}

export function socket (store, data) {
    const handler = routes.reduce((fn, route) => {
        if (route.name in data) return route.handler
        return fn
    }, () => {})

    data.method = 'SOCKET'

    handler(store, data)
}