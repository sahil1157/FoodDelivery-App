require('dotenv').config();
const mongoose = require('mongoose')
const mongoURL = process.env.mongoURL

const mongoConnection = () => {
    try {
        mongoose.connect(mongoURL)
        console.log('connected')
    } catch (err) {
        console.log(err)
    }
}

module.exports = mongoConnection
