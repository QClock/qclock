
const animations = require('../../animations')

module.exports = function (request, response) {

    let { method } = request;

    if (method === 'GET') {
        response.end(JSON.stringify({
            animations: Object.keys(animations).map((anim) => {
                return {
                    label: anim,
                    name: animations[anim].name
                }
            })
        }))
    }

    if (method === 'PUT') {
        this.getRequestBody(request, (err, body) => {

            this.tick.pause()

            animations[body.run].run(this, () => {
                this.tick.resume()
            })

            response.end('ok')
        })
    }

}