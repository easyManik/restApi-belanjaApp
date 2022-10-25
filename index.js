const express = require('express');
const bodyParser = require('body-parser');
const products = require('./src/routes/products');
const category = require('./src/routes/category');
const transactions = require('./src/routes/transaction');
const paymentstatus = require('./src/routes/paymentStatus');
const app = express();
const port = 3000;
app.use(bodyParser.json());
app.use('/products', products);
app.use('/category', category);
app.use('/transactions', transactions);
app.use('/paymentstatus', paymentstatus);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});