const pino = require('pino')({
    prettyPrint: true,
    level: process.env.DEBUGLEVEL || 'info',
    base: null
})

export default pino