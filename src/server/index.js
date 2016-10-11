/*

qclock api

    /datetime
        hour
        minute
        timezone
        hw_offset

    /clockface
        type
        outer color
        inner color
        dim toggle
        dim value
        dim start
        dim end

    /network
        ssid
        password

    /animations
        run

*/

const formBody = require("body/form")

const HttpServer = require('http').Server
const fs = require('fs');
const path = require('path');
const Url = require('url')

const paths = [
    'datetime',
    'clockface',
    'network',
    'animations',
    'advanced'
]

module.exports = class Server extends HttpServer {

    constructor (config, tick, npx, network) {
        super()

        this.config = config
        this.tick = tick
        this.npx = npx
        this.network = network

        this.opened = false
        this.__cache = {}

        this.on('request', this.__onRequest.bind(this))
        this.on('clientError', this.__onError.bind(this))

        this.apiRoutes = require('./api')
    }

    start (networkConnection) {
        if (this.opened) return

        console.log('starting admin server')

        this.__networkConnection = networkConnection
        console.log(this.__networkConnection)

        this.listen(this.config.SERVER_PORT, this.__networkConnection.ip)
        this.opened = true
    }

    disconnect () {
        if (!this.opened) return;

        this.__networkConnection = {};
        this.opened = false;
        this.close();
    }

    setDisplayBuffer (buf) {
        this.displayBuffer = buf
    }

    onRpc (request, response) {

        let path = Url.parse(request.url).path

        path = path.replace('/api/', '')

        if (!this.apiRoutes[path]) return this.__404(response);

        this.apiRoutes[path].call(this, request, response)
    }


    __onError (exception, socket) {
        console.log(exception);
    }

    __onRequest (request, response) {

        let url = Url.parse(request.url)
        let page = url.pathname.replace('/', '')

//        console.log(url, page, paths.indexOf(page))

        if (/^\/api\//.test(url.pathname)) return this.onRpc(request, response);

        if (this.__cache[request.url]) return response.end(this.__cache[request.url]);

        if (url.pathname == '/') {
            response.statusCode = 302
            response.setHeader('Location', '/datetime');
            return response.end();
        }

        if (paths.indexOf(page) > -1) {
            page = 'index.html'
        }

        fs.readFile(path.resolve(__dirname + '/../web') + '/' + page, this.__serve.bind(this, request, response))
    }

    __serve (request, response, err, file) {
        if (err) {
            console.log(err)
            response.statusCode = 404
            return response.end('not found')
        }

        response.setHeader('Last-Modified', new Date());
        response.setHeader('Cache-Control','no-cache, no-store, must-revalidate')
        response.setHeader('Pragma', 'no-cache')
        response.setHeader('Expires', '0')
        this.__cache[request.url] = file

        response.end(file)
    }

    __404 (response) {
        response.statusCode = 404
        return response.end('not found')
    }

    getRequestBody (request, next) {
        formBody(request,next)
    }

}