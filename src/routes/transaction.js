const express = require('express');

const router = express.Router();
const { TransactionsController } = require('../controller/transactions');

router.get('/', TransactionsController.getProduct);
router.post('/', TransactionsController.insert);
router.put('/:id', TransactionsController.update);
router.delete('/:id', TransactionsController.delete);
module.exports = router;
