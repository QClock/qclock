const fs = require('fs')


module.exports = function (request, response) {

    let { method } = request;

    if (method === 'GET') {

        fs.readFile('error.log', { encoding: 'utf8' }, (err, data) => {
            let debug = ''
            if (!err) {
                debug = data.toString() 
            }

            response.end(JSON.stringify({
                debug
            }))
        })

        
    }


}