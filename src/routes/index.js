const express = require('express');

const router = express.Router();

const products = require('./products');
const category = require('./category');
const transactions = require('./transaction');
const paymentstatus = require('./paymentStatus');
const users = require('./users');

// const app = express();

router.use('/products', products);
router.use('/category', category);
router.use('/transactions', transactions);
router.use('/paymentstatus', paymentstatus);
router.use('/users', users);

module.exports = router;
