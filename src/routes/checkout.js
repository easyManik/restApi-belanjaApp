const express = require('express');
const router = express.Router();
const checkoutController = require('../controller/checkout');
const { protect } = require('../middleware/auth');

router
  .get('/', protect, checkoutController.getCheckout)
  .post('/', protect, checkoutController.insertCheckout)
  .put('/:id', protect, checkoutController.updateCheckout)
  .delete('/:id', protect, checkoutController.deleteCheckout);

module.exports = router;
