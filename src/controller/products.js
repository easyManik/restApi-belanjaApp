const ModelProduct = require('../model/products');

const ProductController = {
  update: (req, res) => {
    ModelProduct.updateData(req.params.id, req.body)
      .then(() =>
        res.send({
          status: 200,
          message: 'berhasil memasukan data',
        })
      )
      .catch((err) => res.send({ message: 'error', err }))
  },
  delete: (req, res) => {
    ModelProduct.deleteData(req.params.id)
      .then(() =>
        res.send({ status: 200, message: 'berhasil menghapus data' })
      )
      .catch((err) => res.send({ message: 'error', err }));
  },
  getProduct: (req, res) => {
    ModelProduct.selectData()
      .then((result) => res.send({ result: result.rows }))
      .catch((err) => res.send({ message: 'error', err }));
  },
  insert: (req, res) => {
    ModelProduct.insertData(req.body)
      .then(() =>
        res.send({ status: 200, message: 'berhasil memasukan data'})
      )
      .catch((err) => res.send({ message: 'error', err }));
  },
  searchData: (req, res) =>{
    const search = req.query.data;
    ModelProduct.searchData(search)
      .then((result) => res.send({ result: result.rows }))
      .catch((err) => res.send({ message: 'error', err }))
  },
  sortData: (req, res) => { 
    const sortby = req.query.sortby || 'id';
    const sort = req.query.sort || 'asc';
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    ModelProduct.sortData(sortby, sort, page, limit)
      .then((result) => res.send({ result: result.rows }))
      .catch((err) => res.send({ message: 'error', err }))
  },
  pagination: (req, res) => {
    const limit = parseInt(req.query._limit) || 5;
    const offset = parseInt(req.query._offset) || 0;
    ModelProduct.pagination(limit, offset)
      .then((result) => res.send({ result: result.rows }))
      .catch((err) => res.send({ message: 'error', err }))
  },
  getData: (req, res) =>{
    ModelProduct.getData()
      .then((result) => res.send({ result: result.rows }))
      .catch((err) => res.send({ message: 'error', err }))
  }
};

exports.ProductController = ProductController;