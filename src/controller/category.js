const ModelCategory = require('../model/category');

const CategoryController = {
  update: (req, res) => {
    ModelCategory.updateData(req.params.id, req.body)
      .then((result) => res.send(
        {
          status: 200,
          message: 'Berhasil memasukan data',
          data: result,
        },
      )).catch((err) => res.send({ message: 'error', err }));
  },
  delete: (req, res) => {
    ModelCategory.deleteData(req.params.id)
      .then(() => res.send({ status: 200, message: 'Berhasil memasukan data' })).catch((err) => res.send({ message: 'error', err }));
  },
  getProduct: (req, res) => {
    ModelCategory.selectData()
      .then((result) => res.send({ result: result.rows }))
      .catch((err) => res.send({ message: 'error', err }));
  },
  insert: (req, res) => {
    ModelCategory.insertData(req.body)
      .then(() => res.send({ status: 200, message: 'Berhasil memasukan data' }))
      .catch((err) => res.send({ message: 'error', err }));
  },
};
exports.CategoryController = CategoryController;
