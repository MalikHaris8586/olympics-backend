const mongoose = require('mongoose')

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/olympics'

mongoose
    .connect(MONGODB_URI)
    .then(() => {
        console.log('connect successfull')
    })
    .catch((error) => {
        console.log('connect failed')
        console.error(error && error.message ? error.message : error)
    })