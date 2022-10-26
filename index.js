require('dotenv').config();

const express = require('express');

const bodyParser = require('body-parser');
const helmet = require('helmet');
const xss = require('xss-clean');
const cors = require('cors');
const products = require('./src/routes/products');
const category = require('./src/routes/category');
const transactions = require('./src/routes/transaction');
const paymentstatus = require('./src/routes/paymentStatus');

const app = express();

app.use(xss());
app.use(cors());
app.use(helmet());

app.use(bodyParser.json());
app.use('/products', products);
app.use('/category', category);
app.use('/transactions', transactions);
app.use('/paymentstatus', paymentstatus);
app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});
