// FoodController.js
const { foodModel } = require('../FoodModel/FoodItems');
const fs = require("fs");

// to add food
const addFood = async (req, res) => {
    let image_filename = `${req.file.filename}`;

    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename
    });

    try {
        await food.save();
        res.json({ success: true, message: "Food Added" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to add food" });
    }
};

// to list food
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({})
        res.json({ success: true, data: foods })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "error" })
    }
}

// to remove the food Items...
const removeFood = async (req, res) => {
    try {
        const removeFood = await foodModel.findByIdAndDelete('_id')
        fs.unlink(`uploads/${removeFood.image}`, () => {
        })
        await foodModel.findByIdAndDelete(req.body.id)
    } catch (error) {

    }
}



module.exports = { addFood, listFood, removeFood };