const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 4000;
const connect = require('./services/Database');
const logger = require('morgan');

//read json and request body
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//use morgan
app.use(logger('tiny'));

//use user routes
const userRoutes = require('./routes/UserRoutes');
app.use('/user', userRoutes);

//use product routes
const productRoutes = require('./routes/ProductRoutes');
app.use('/product', productRoutes);

app.listen(PORT, ()=> console.log(`Listening in port ${PORT}!`));



