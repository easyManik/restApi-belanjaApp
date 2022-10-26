const express = require('express');

const router = express.Router();
const { ProductController } = require('../controller/products');
const { product } = require('../middleware/products');

router.get('/', ProductController.getProduct);
router.post('/', product, ProductController.insert);
router.put('/:id', product, ProductController.update);
router.delete('/:id', ProductController.delete);
router.get('/:search', ProductController.searchData);
router.get('/:sort', ProductController.sortData);
router.get('/:pagination', ProductController.pagination);
router.get('//', ProductController.getData);

module.exports = router;
