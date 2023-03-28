const express = require('express');

const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/* config CORS */
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});


// routes setups
app.get("/", (req, res) => {
    res.json({ message: "Its Work" });
});

var product = require('./app/router/product')
var customerAddress = require('./app/router/customerAddress')
var customer = require('./app/router/customer')
var order = require('./app/router/order')
var paymentMethod = require('./app/router/paymentMethod')


app.use('/api/product', product);
app.use('/api/customer-address', customerAddress);
app.use('/api/customer', customer);
app.use('/api/order', order);
app.use('/api/payment-method', paymentMethod);


// User Request Error Handler
app.use((req, res, next) => {
    const error = new Error('Invalid URL or parameters');
    error.status = 400;
    next(error);
});

// Server Error Handler 
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});