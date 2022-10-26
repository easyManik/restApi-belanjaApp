const express = require('express');

const router = express.Router();
const { PSController } = require('../controller/paymentStatus');

router.get('/', PSController.getProduct);
router.post('/', PSController.insert);
router.put('/:id', PSController.update);
router.delete('/:id', PSController.delete);
module.exports = router;
