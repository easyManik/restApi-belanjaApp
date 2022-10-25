const ModelProduct = require('../model/products');

const ProductController = {
  update: (req, res) => {
    ModelProduct.updateData(req.params.id, req.body)
      .then(() =>
        res.send({
          status: 200,
          message: `berhasil memasukan data`,
        })
      )
      .catch((err) => res.send({ message: 'error', err }))
  },
  delete: (req, res) => {
    ModelProduct.deleteData(req.params.id)
      .then(() =>
        res.send({ status: 200, message: `berhasil menghapus data` })
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
        res.send({ status: 200, message: `berhasil memasukan data` })
      )
      .catch((err) => res.send({ message: 'error', err }));
  },
  searchData: (req, res) =>{
    ModelProduct.searchData()
      .then((result) => res.send({ result: result.rows }))
      .catch((err) => res.send({ message: 'error', err }))
  },
  sortData: (req, res) => { 
    ModelProduct.sortData()
      .then((result) => res.send({ result: result.rows }))
      .catch((err) => res.send({ message: 'error', err }))
  },
  pagination: (req, res) => { 
    ModelProduct.pagination()
      .then((result) => res.send({ result: result.rows }))
      .catch((err) => res.send({ message: 'error', err }))
  }
};

exports.ProductController = ProductController;