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
const ws = require('ws')

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
        this.wsConnections = new Set()

        this.on('request', this.__onRequest.bind(this))
        this.on('clientError', this.__onError.bind(this))

        this.apiRoutes = require('./api')

        this.receivePauseTimeout = 0
    }

    start (networkConnection) {
        if (this.opened) return

        console.log('starting admin server')

        this.__networkConnection = networkConnection
        console.log(this.__networkConnection)

        this.listen(this.config.SERVER_PORT, this.__networkConnection.ip)
        this.opened = true

        var WebSocketServer = ws.Server,
            wss = new WebSocketServer({ port: 8899 });

        wss.on('connection', (ws) => {
            ws.on('close', this.onWsClose(ws))
            ws.on('message', (json)=>{
                let data = JSON.parse(json)

                let { frames, fps } = data;

                this.tick.pause()

                let interval = Math.round(1000 / fps)

                let frameInterval = setInterval(() => {

                    if (!frames.length) {
                        clearInterval(frameInterval)
                        this.tick.resume()
                        return;
                    }

                    let frame = frames.shift()

                    this.npx.send(Uint8Array.from(frame))
                    this.setDisplayBuffer(Uint8Array.from(frame))


                }, interval)


            })
            this.wsConnections.add(ws)
        });
    }

    onWsClose (ws) {
        return ()=>{
            this.wsConnections.delete(ws)
        }
    }

    disconnect () {
        if (!this.opened) return;

        for (let con of this.wsConnections) {
            con.terminate()
            this.wsConnections.delete(con)
        }

        this.__networkConnection = {};
        this.opened = false;
        this.close();
    }

    setDisplayBuffer (buf) {
        this.displayBuffer = buf


        this.wsConnections.forEach((con)=>{
           if (con.readyState === 1) con.send(this.displayBuffer)
        })
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