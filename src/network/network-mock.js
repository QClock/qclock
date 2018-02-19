const util = require('util');
import EventEmitter from 'events'


export default class Net extends EventEmitter {

    constructor () {

        super()

        this.ap = {
            on: function () {},
            create: (data, callback) => {
                setTimeout(()=>{ callback(null, {ip: '0.0.0.0'}) }, 400)
            }
        }
    }
}