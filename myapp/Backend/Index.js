const express = require('express');
require('dotenv').config();
const app = express();
const db = require('./db');

const port = 5000;
const cors = require('cors');
const foodRouter = require('./Routing/FoodRouting');
const userRoute = require('./Routing/userRouting.js');
const cookieParser = require('cookie-parser');

db();
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use(cookieParser());

// API endpoint..
app.use('/user', userRoute);
app.use('/menu', foodRouter);
app.use('/', foodRouter);
app.use('/images', express.static('uploads'));
app.use('/image', express.static('uploads'));

app.listen(port, () => {
    console.log(`port is running on ${port}`);
});
