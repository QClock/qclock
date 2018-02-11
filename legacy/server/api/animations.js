
const animations = require('../../animations')
const Animation = require('../../lib/Animation')

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

            let { fps, frameCount, outer, inner } = animations[body.run];

            let anim = new Animation(fps, frameCount, outer, inner)

            let { frames } = anim.render();

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

            response.end('ok')
        })
    }

}