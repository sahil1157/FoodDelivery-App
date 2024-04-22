const express = require('express')
const app = express()
const db = require('./db')
const port = 5000;
const cors = require("cors")
const userModel = require("./Model/User");
const foodRouter = require('./Routing/FoodRouting')

app.get("/", (req, res) => {
    res.send('hello there')
})
db()
app.use(cors())
app.use(express.json())

app.post("/login", (req, res) => {
    const { email, password } = req.body
    userModel.findOne({ email: email })
        .then(data => {
            if (data) {
                if (data.password === password) {
                    res.json("Password matched")
                }
                else {
                    res.json("Password didnot match")
                }
            } else {
                res.json("Username not found")
            }
        })
})

app.post("/api/createUser", (req, res) => {
    userModel.create(req.body)
        .then(users => res.json(users))
        .catch(err => res.json(err))
})

// api endpoint...
app.use("/menu", foodRouter)
app.use("/", foodRouter)
app.use("/images", express.static("uploads"))
app.use("/image", express.static("uploads"))

// app.use("/api", newUser)

app.listen(port, () => {
    console.log(`port is running on ${port}`)
})

