const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const productController = require('../controller/product');

router
  .get('/', productController.getProduct)
  .get('/:id', productController.detailProduct)
  .post('/', upload.single('photo'), productController.insertProduct)
  .put('/:id', upload.single('photo'), productController.updateProduct)
  .delete('/:id', productController.deleteProduct);

module.exports = router;
