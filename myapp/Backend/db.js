const mongoose = require('mongoose')
const mongoURL = "mongodb+srv://basnetsahil381:sahilbro12345@cluster0.9whtb1a.mongodb.net/gofoodmern?retryWrites=true&w=majority&appName=Cluster0"

const mongoConnection = () => {
    try {
        mongoose.connect(mongoURL)
        console.log('connected')
    } catch (err) {
        console.log(err)
    }
}

// api

module.exports = mongoConnection
