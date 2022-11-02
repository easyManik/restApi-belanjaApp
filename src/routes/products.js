const express = require('express');

const router = express.Router();
const { ProductController } = require('../controller/products');
// const { errorHandling } = require('../middleware/errorHandling');
const { validateStock } = require('../helpers/stock');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.get('/', protect, ProductController.getProduct);
router.post('/', upload.single('photo'), ProductController.insert);
router.put('/:id', protect, ProductController.update);
router.delete('/:id', protect, ProductController.delete);
router.get('/:search', protect, ProductController.searchData);
router.get('/:sort', protect, ProductController.sortData);
router.get('/:pagination', protect, ProductController.pagination);
router.get('//', protect, ProductController.getData);

module.exports = router;
