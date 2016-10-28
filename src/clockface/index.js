var config = require('../config/config.js')

class Clockface {
	constructor () {

		this.clockfaceList = [
			new (require('./Original'))(config),
			new (require('./SingleColor'))(config),
			new (require('./SecondLight'))(config)
		]
		// find and load available clockfaces
		// init one by the config

		this.currentIndex = 0
	}

	read (date, callback) {
		// currentclockface read

		this.clockfaceList[0].read(date, callback)
	}

	get list () {
		return this.clockfaceList
	}

	set current (name) {

		this.currentIndex = this.clockfaceList.reduce((collect, item, index) => {
			if (item.name === name) return index;

			return collect;
		}, 0)
	}

	get current () {
		return this.clockfaceList[this.currentIndex]
	}
}

const instance = new Clockface()


module.exports = instance