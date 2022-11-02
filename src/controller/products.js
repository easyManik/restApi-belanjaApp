const ModelProduct = require('../model/products');
const { common } = require('../middleware/common');

const ProductController = {
  update: (req, res) => {
    ModelProduct.updateData(req.params.id, req.body)
      .then((result) => common(res, 200, true, result, 'Success update data'))
      .catch((err) => common(res, 404, false, err, 'fail to update data'));
  },
  delete: (req, res) => {
    ModelProduct.deleteData(req.params.id)
      .then((result) => common(res, 200, true, result, 'Success delete data'))
      .catch((err) => common(res, 404, false, err, 'fail to delete data'));
  },
  getProduct: (req, res) => {
    ModelProduct.selectData()
      .then((result) => common(res, 200, true, result.rows, 'Success get data'))
      .catch((err) => common(res, 404, false, err, 'fail to get data'));
  },
  insert: (req, res) => {
    const Port = process.env.PORT;
    const Host = process.env.HOST;
    const photo = req.file.filename;
    console.log(photo);
    const uri = `http://${Host}:${Port}/img/${photo}`;
    req.body.photo = uri;
    // eslint-disable-next-line radix
    req.body.stock = parseInt(req.body.stock);
    // eslint-disable-next-line radix
    req.body.price = parseInt(req.body.price);
    ModelProduct.insertData(req.body)
      .then((result) => common(res, 200, true, result.rows, 'get data success'))
      .catch((err) => common(res, 404, false, err, 'fail to insert data'));
  },
  searchData: (req, res) => {
    const search = req.query.data;
    ModelProduct.searchData(search)
      .then((result) => common(res, 200, true, result.rows, 'get data to search data success'))
      .catch((err) => common(res, 404, false, err, 'fail to search data'));
  },
  sortData: (req, res) => {
    const sortby = req.query.sortby || 'id';
    const sort = req.query.sort || 'asc';
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    ModelProduct.sortData(sortby, sort, page, limit)
      .then((result) => common(res, 200, true, result.rows, 'get data to sorting data success'))
      .catch((err) => common(res, 404, false, err, 'fail to sorting data'));
  },
  pagination: (req, res) => {
    const limit = parseInt(req.query._limit) || 5;
    const offset = parseInt(req.query._offset) || 0;
    ModelProduct.pagination(limit, offset)
      .then((result) => common(res, 200, true, result.rows, 'get data to pagination success'))
      .catch((err) => common(res, 404, false, err, 'fail to pagination data'));
  },
  getData: (req, res) => {
    ModelProduct.getData()
      .then((result) => common(res, 200, true, result.rows, 'get data success'))
      .catch((err) => common(res, 404, false, err, 'fail to get data'));
  },
};

// console.log(ProductController.getProduct);

exports.ProductController = ProductController;
