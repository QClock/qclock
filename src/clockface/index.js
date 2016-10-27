var config = require('../config/config.js')

class Clockface {
	constructor () {

		this.clockfaceList = [
			new (require('./Original'))(config)
		]
		// find and load available clockfaces
		// init one by the config

		console.log('init')
	}

	read (date, callback) {
		// currentclockface read

		this.clockfaceList[0].read(date, callback)
	}

	get list () {
		return this.clockfaceList
	}

	get current () {
		return this.clockfaceList[0]
	}
}

const instance = new Clockface()


module.exports = instance