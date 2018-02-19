const pino = require('pino')({
    prettyPrint: true,
    level: process.env.DEBUGLEVEL,
    base: null
})

export default pino