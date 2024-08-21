require('dotenv').config();
const mongoose = require('mongoose')

const mongoConnection = async () => {
    try {
        await mongoose.connect(process.env.mongoURL, {
            serverSelectionTimeoutMS: 5000,
            dbName:"gofoodmern",
            writeConcern: { w: 'majority' }
        });
        console.log(('MongoDB connected'));
    } catch (error) {
        console.error((`Error connecting to MongoDB: ${error.message}`));
        process.exit(1);
    }
};

module.exports = mongoConnection
