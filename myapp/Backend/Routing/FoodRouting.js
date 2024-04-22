const express = require('express')
const multer = require("multer")
const {addFood,listFood, removeFood} = require('../Model/FoodModel/FoodController')


const foodRouter = express.Router()

// storing images,,
const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}${file.originalname}`)
    }
})
const upload = multer({ storage: storage })

foodRouter.post('/', upload.single("image"), addFood)
foodRouter.get("/list",listFood)
foodRouter.get('/remove',removeFood)

module.exports = foodRouter
