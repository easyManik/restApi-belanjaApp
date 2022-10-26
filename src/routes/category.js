const express = require('express');

const router = express.Router();
const { CategoryController } = require('../controller/category');

router.get('/', CategoryController.getProduct);
router.post('/', CategoryController.insert);
router.put('/:id', CategoryController.update);
router.delete('/:id', CategoryController.delete);
module.exports = router;
