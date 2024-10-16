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
        const foods = await foodModel.find({}).sort({ createdAt: -1 })
        res.json({ success: true, data: foods })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "error" })
    }
}

const removeFood = async (req, res) => {
    const { id } = req.body;

    try {
        const foodItem = await foodModel.findByIdAndDelete(id);

        if (foodItem) {
            const imagePath = `uploads/${foodItem.image}`;
            fs.unlink(imagePath, (err) => {
                if (err) {
                    console.log("Error deleting image:", err);
                }
            });
        }

        res.status(200).json({ message: 'Food item deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete food item' });
    }
};

const editFood = async (req, res) => {
    try {
        const { name, category, price, description, id } = req.body;
        let image = req.file ? req.file.filename : null

        const updateFields = {
            name,
            category,
            price,
            description,
        };

        if (image) {
            updateFields.image = image; 
        }

        const updatedFood = await foodModel.findByIdAndUpdate(
            id,
            { $set: updateFields },
            { new: true }
        );

        if (updatedFood) {
            return res.status(200).json({ message: "success", data: updatedFood });
        } else {
            return res.status(404).json({ message: "Food item not found" });
        }

    } catch (error) {
        res.status(500).json({ message: "Failed to update food item" });
    }
};


module.exports = removeFood;




module.exports = { addFood, listFood, removeFood, editFood };