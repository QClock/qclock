const HttpsServer = require('https').Server
const WebSocket = require('ws')
const fs = require('fs')
const path = require('path')
const URL = require('url')

import log from '../log'
import * as routes from './routes'

const set404 = (response) => {
    response.statusCode = 404
    return response.end('not found')
}

const preflight = (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, OPTIONS')
    res.setHeader('Access-Control-Max-Age', 86400)
    res.statusCode = 200
    return res.end()
}

module.exports = class Server extends HttpsServer {

    constructor (store) {

        console.log(__dirname)


        super({
            key: fs.readFileSync(`${CERT_PATH}/key.pem`),
            cert: fs.readFileSync(`${CERT_PATH}/cert.pem`),
            passphrase: process.env.CERT_PASSPHRASE  //QCLK
        })

        this.store = store
        this.opened = false
        this.__cache = {}
        this.wsConnections = new Set()

        this.on('request', (request, response) => this.__onRequest(request, response))
        this.on('clientError', exception => this.__onError(exception))
    }

    start () {
        if (this.opened) return

        const network = this.store.getState().network

        this.wss = new WebSocket.Server({
            server: this
        })

        this.wss.on('connection', (ws) => this.onSocketConnection(ws))
        this.wss.on('error', (err) => log.error(err))
        this.wss.on('listening', () => {
            const { address, port } = this.wss.address()
            log.info(`WS listening ${address}:${port}`)
        })

        this.listen(network.port, '0.0.0.0')
        this.opened = true
    }

    disconnect () {
        if (!this.opened) return

        this.opened = false
        this.close()
    }

    onSocketConnection (ws) {
        log.info('new websocket connection')

        let currentValue

        const unsubscribe = this.store.subscribe(() => {
            let previousValue = currentValue
            currentValue = this.store.getState().pixels
            if (previousValue !== currentValue) {
                ws.send(
                    JSON.stringify(this.store.getState())
                )
            }
        })

        ws.on('error', (err) => log.error(err))
        ws.on('close', unsubscribe)

        ws.on('message', (message) => {
            let data = {}
            try {
                data = JSON.parse(message)
            } catch (e) {
                log.error(e)
            }

            routes.socket(this.store, data)
        })
    }

    __onRequest (request, response) {
        const url = URL.parse(request.url)
        let page = url.pathname.replace('/', '')

        if (request.method === 'OPTIONS') {
            return preflight(request, response)
        }

        if (routes.match(url)) {
            return routes.handle(this.store, request, response)
        }

        if (this.__cache[request.url]) {
            return response.end(this.__cache[request.url])
        }


        console.log('__onRequest', url)
        const assetRequest = /\.\w*$/.test(url.pathname)

        if (!assetRequest) {
            page = 'index.html'
        }

        const filePath = path.resolve(__dirname + '/../web') + '/' + page

        fs.readFile(filePath, (err, file) => this.__serve(err, file, assetRequest, request, response))
    }

    __serve (err, file, assetRequest, request, response) {
        if (err) {
            console.log(err)
            response.statusCode = 404
            return response.end('not found')
        }

        if (!assetRequest) {
            file = this.injectConfig(file)
        }

        response.setHeader('Last-Modified', new Date())
        response.setHeader('Cache-Control','no-cache, no-store, must-revalidate')
        response.setHeader('Pragma', 'no-cache')
        response.setHeader('Expires', '0')
        this.__cache[request.url] = file

        response.end(file)
    }

    __onError (exception) {
        log.error(exception)
    }

    injectConfig (html) {
        return html.toString().replace(/\/\* QCLOCKCONSTANTS \*\//, `window.QCLOCK = ${JSON.stringify(this.store.getState().clientConfig)};`)
    }

}