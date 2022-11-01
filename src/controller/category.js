const ModelCategory = require('../model/category');
const { common } = require('../middleware/common');

const CategoryController = {
  update: (req, res) => {
    ModelCategory.updateData(req.params.id, req.body)
      .then((result) => common(res, 200, true, result, 'Success update data'))
      .catch((err) => common(res, 404, false, err, 'fail to update data'));
  },
  delete: (req, res) => {
    ModelCategory.deleteData(req.params.id)
      .then((result) => common(res, 200, true, result, 'Success delete data'))
      .catch((err) => common(res, 404, false, err, 'fail to delete data'));
  },
  getProduct: (req, res) => {
    // console.log('update', getProduct)
    ModelCategory.selectData()
      .then((result) => common(res, 200, true, result.rows, 'Success get data'))
      .catch((err) => common(res, 404, false, err, 'fail to get data'));
  },
  insert: (req, res) => {
    req.body.stock = parseInt(req.body.stock);
    req.body.price = parseInt(req.body.price);
    ModelCategory.insertData(req.body)
      .then((result) => common(res, 200, true, result.rows, 'get data success'))
      .catch((err) => common(res, 404, false, err, 'fail to insert data'));
  },
};
exports.CategoryController = CategoryController;
