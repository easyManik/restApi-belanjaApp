const express = require('express');

const router = express.Router();

const products = require('./products');
const category = require('./category');
const transactions = require('./transaction');
const paymentstatus = require('./paymentStatus');
const users = require('./users');

const app = express();

app.use('/products', products);
app.use('/category', category);
app.use('/transactions', transactions);
app.use('/paymentstatus', paymentstatus);
app.use('/users', users);


module.exports = router;
