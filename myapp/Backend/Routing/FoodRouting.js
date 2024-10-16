const express = require('express')
const multer = require("multer")
const { addFood, listFood, removeFood, editFood } = require('../Model/FoodModel/FoodController')
const { isAdmin } = require('../Controllers/UserController')
const protection = require('../Middleware/check-auth')


const foodRouter = express.Router()

// storing images,,
const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}${file.originalname}`)
    }
})
const upload = multer({ storage: storage })

foodRouter.get("/list", listFood)
foodRouter.post("/add", upload.single("image"), addFood)
// foodRouter.use(protection)
foodRouter.post('/', upload.single("image"), addFood)
foodRouter.post('/remove', removeFood)
foodRouter.post('/edit', upload.single("image"), editFood)

module.exports = foodRouter
