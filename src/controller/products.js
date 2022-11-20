/* eslint-disable radix */
const ModelProduct = require('../model/products');
const { common } = require('../middleware/common');
const cloudinary = require('../config/photo');

const ProductController = {
  update: async (req, res, next) => {
    try {
      req.body.stock = parseInt(req.body.stock);
      req.body.price = parseInt(req.body.price);
      req.body.category_id = parseInt(req.body.category_id);
      const image = await cloudinary.uploader.upload(req.file.path, {
        folder: 'img_food',
      });
      req.body.photo = image.url;
      await ModelProduct.updateData(req.params.id, req.body);
      return common(res, 200, true, req.body, 'update data success');
    } catch (e) {
      return common(res, 404, false, e, 'update data fail');
    }
  },
  delete: (req, res) => {
    ModelProduct.deleteData(req.params.id)
      .then((result) => common(res, 200, true, result, 'Success delete data'))
      .catch((err) => common(res, 404, false, err, 'fail to delete data'));
  },
  getProduct: async (req, res, next) => {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      const offset = (page - 1) * limit;
      const sort = req.query.sort || 'ACS';
      const sortby = req.query.sortby || 'name';
      const search = req.query.search || '';
      const result = await ModelProduct.selectData({
        limit,
        offset,
        sort,
        sortby,
        search,
      });
      common(res, 200, true, result.rows, ' get data success');
    } catch (e) {
      common(res, 404, false, e, 'get data fail');
    }
  },
  insert: async (req, res) => {
    try {
      const Port = process.env.PORT;
      const Host = process.env.HOST;
      const photo = req.file.filename;
      req.body.stock = parseInt(req.body.stock);
      req.body.price = parseInt(req.body.price);
      req.body.category_id = parseInt(req.body.category_id);
      // const image = await cloudinary.uploader.upload(req.file.path, {
      //   folder: 'img_food',
      // });
      const uri = `http://${Host}:${Port}/img/${photo}`;
      req.body.photo = uri;

      // req.body.photo = image.url;
      await ModelProduct.insertData(req.body);
      return common(res, 200, true, req.body, 'input data success');
    } catch (e) {
      return common(res, 404, false, e, 'input data fail');
    }
  },
  // sortData: (req, res) => {
  //   const sortby = req.query.sortby || 'id';
  //   const sort = req.query.sort || 'asc';
  //   const page = parseInt(req.query.page) || 1;
  //   const limit = parseInt(req.query.limit) || 5;
  //   ModelProduct.sortData(sortby, sort, page, limit)
  //     .then((result) =>
  //       common(res, 200, true, result.rows, 'get data to sorting data success')
  //     )
  //     .catch((err) => common(res, 404, false, err, 'fail to sorting data'));
  // },
  // pagination: (req, res) => {
  //   const limit = parseInt(req.query.limit) || 5;
  //   const offset = parseInt(req.query.offset) || 0;
  //   ModelProduct.pagination(limit, offset)
  //     .then((result) =>
  //       common(res, 200, true, result.rows, 'get data to pagination success')
  //     )
  //     .catch((err) => common(res, 404, false, err, 'fail to pagination data'));
  // },
  getData: (req, res) => {
    ModelProduct.getData(req.params.id)
      .then((result) => common(res, 200, true, result.rows, 'get data success'))
      .catch((err) => common(res, 404, false, err, 'fail to get data'));
  },
};

exports.ProductController = ProductController;
