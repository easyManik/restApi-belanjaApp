const ModelTransactions = require('../model/transaction')
const TransactionsController = {
  update: (req, res) => {
    ModelTransactions.updateData(req.params.id, req.body).then(() => res.send(
      {
        status: 200,
        message: 'berhasil memasukan data',
      }
    )).catch((err) => res.send({ message: 'error', err }))
  },
  delete: (req, res) => {
    ModelTransactions.deleteData(req.params.id)
      .then(() =>
        res.send({ status: 200, message: 'berhasil menghapus data' })
      )
      .catch((err) => res.send({ message: 'error', err }));
  },
  getProduct: (req, res) => {
    ModelTransactions.selectData()
      .then((result) => res.send({ result: result.rows }))
      .catch((err) => res.send({ message: 'error', err }));
  },
  insert: (req, res) => {
    ModelTransactions.insertData(req.body).then(() => res.send(
      { status: 200, message: 'berhasil memasukan data' }
    )).catch((err) => res.send({ message: 'error', err }))
}
}
exports.TransactionsController = TransactionsController