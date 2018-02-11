
const HttpServer = require('http').Server
const fs = require('fs');
const path = require('path');
const URL = require('url')

import log from '../log'
import routes from './routes'

const set404 = (response) => {
    response.statusCode = 404
    return response.end('not found')
}

module.exports = class Server extends HttpServer {

    constructor () {
        super()

        this.opened = false
        this.__cache = {}
        this.wsConnections = new Set()

        this.on('request', (request, response) => this.__onRequest(request, response))
        this.on('clientError', exception => this.__onError(exception))
    }

    start (network) {
        if (this.opened) return

        this.listen(network.port, network.ip)

        this.opened = true
    }

    disconnect () {
        if (!this.opened) return;

        this.opened = false;
        this.close();
    }

    __onRequest (request, response) {

        let url = URL.parse(request.url)
        let page = url.pathname.replace('/', '')

        if (routes.match(url)) {
            return routes.handle(request, response);
        }

        if (this.__cache[request.url]) {
             return response.end(this.__cache[request.url])
        }

        if (url.pathname == '/') {
            page = 'index.html'
        }
        const filePath = path.resolve(__dirname + '/../web') + '/' + page;

        fs.readFile(filePath, (err, file) => this.__serve(err, file, request, response))
    }

    __serve (err, file, request, response) {
        if (err) {
            console.log(err)
            response.statusCode = 404
            return response.end('not found')
        }

        response.setHeader('Last-Modified', new Date())
        response.setHeader('Cache-Control','no-cache, no-store, must-revalidate')
        response.setHeader('Pragma', 'no-cache')
        response.setHeader('Expires', '0')
        this.__cache[request.url] = file

        response.end(file)
    }

    __onError (exception) {
        log.error(exception);
    }

}