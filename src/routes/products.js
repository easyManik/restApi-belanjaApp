const express = require('express');
const router = express.Router();
const { ProductController } = require('../controller/products');
router.get('/', ProductController.getProduct);
router.post('/', ProductController.insert);
router.put('/:id', ProductController.update);
router.delete('/:id', ProductController.delete);
router.search('/', ProductController.searchData)
router.get('/', ProductController.sortData)
router.get('/', ProductController.pagination)
module.exports = router;