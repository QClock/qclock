const URL = require('url')

import log from '../../log'
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


export function match (url) {

}

export function handle (request, response) {
    let url = URL.parse(request.url)
    let page = url.pathname.replace('/', '')
}