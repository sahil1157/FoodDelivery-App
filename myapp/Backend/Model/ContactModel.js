const mongoose = require("mongoose")

const contactSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
}, {
    timestamps: true
})

const contactModel = mongoose.models.Contacts || mongoose.model("Contacts", contactSchema)
module.exports = contactModel