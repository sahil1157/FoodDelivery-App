// FoodModel.js
const mongoose = require('mongoose');

const foodSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    category: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: false
    },
});

const foodModel = mongoose.models.foodItems || mongoose.model('foodDatas', foodSchema);

module.exports = { foodModel, foodSchema }; 
