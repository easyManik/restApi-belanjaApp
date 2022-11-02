const express = require('express');

const router = express.Router();
const { CategoryController } = require('../controller/category');
const { validateCategory } = require('../helpers/category');
const { protect } = require('../middleware/auth');

router.get('/', protect, CategoryController.getProduct);
router.post('/', protect, validateCategory, CategoryController.insert);
router.put('/:id', protect, CategoryController.update);
router.delete('/:id', protect, CategoryController.delete);
module.exports = router;
