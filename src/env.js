import dotenv from 'dotenv'

let config = {path: '/tmp/remote-script/.env'}

if (process.env.NODE_ENV === 'docker') {
    config = {}
}

dotenv.config(config)