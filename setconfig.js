const fs = require('fs')

let config = fs.readFileSync('package.json', 'utf8')
config = JSON.parse(config)

config.qclock.time = +new Date() + 60000
config.qclock.network.ssid = 'QCLOCK-' + (Math.ceil(Math.random() * +new Date())).toString(36).substr(0,4).toUpperCase()

fs.writeFileSync('./build/package.json', JSON.stringify(config), {
    encoding: 'utf8',
    flag: 'w+'
})