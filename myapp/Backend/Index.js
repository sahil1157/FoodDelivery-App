const express = require('express');
require('dotenv').config();
const app = express();
const db = require('./db.js');

// const port = 5000;
const port = process.env.PORT || 5000;
const cors = require('cors');
const foodRouter = require('./Routing/FoodRouting.js');
const userRoute = require('./Routing/userRouting.js');
const cookieParser = require('cookie-parser');

db();

app.use(cors({ origin: 'https://gofood4real.netlify.app', credentials: true }));
// app.use(cors({
//   origin: 'http://localhost:3000',
//   credentials: true
// }));

app.use(express.json());
app.use(cookieParser());





// API endpoint..
app.use('/user', userRoute);
app.use('/menu', foodRouter);
app.use('/', foodRouter);
app.use('/images', express.static('uploads'));
app.use('/image', express.static('uploads'));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });

  