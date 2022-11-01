const ModelTransactions = require('../model/transaction');
const { common } = require('../middleware/common');

const TransactionsController = {
  update: (req, res) => {
    ModelTransactions.updateData(req.params.id, req.body)
      .then((result) => common(res, 200, true, result, 'Success update data'))
      .catch((err) => common(res, 404, false, err, 'fail to update data'));
  },
  delete: (req, res) => {
    ModelTransactions.deleteData(req.params.id)
      .then((result) => common(res, 200, true, result, 'Success delete data'))
      .catch((err) => common(res, 404, false, err, 'fail to delete data'));
  },
  getProduct: (req, res) => {
    ModelTransactions.selectData()
      .then((result) => common(res, 200, true, result.rows, 'Success get data'))
      .catch((err) => common(res, 404, false, err, 'fail to get data'));
  },
  insert: (req, res) => {
    req.body.stock = parseInt(req.body.stock);
    req.body.price = parseInt(req.body.price);
    ModelTransactions.insertData(req.body)
      .then((result) => common(res, 200, true, result.rows, 'get data success'))
      .catch((err) => common(res, 404, false, err, 'fail to insert data'));
  },
};
exports.TransactionsController = TransactionsController;
