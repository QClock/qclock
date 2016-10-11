
const animations = require('../../animations')


module.exports = function (request, response) {

    if (method === 'GET') {
        response.end(JSON.stringify({
            animations: Object.keys(animations).map((anim)=>{
                return {
                    label: anim,
                    name: animations[anim].name
                }
            })
        }))
    }


    if (method === 'PUT') {
        this.getRequestBody(request, (err, body) => {

            console.log(body.animation)


            //this.tick.pause()

            animations[body.animation].run(this.npx, ()=>{
                this.tick.resume()
            })

            response.end('ok')

        })
    }


}