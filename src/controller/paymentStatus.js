const PSProduct = require('../model/paymentStatus');

const PSController = {
  update: (req, res) => {
    PSProduct.updateData(req.params.id, req.body)
      .then((result) =>
        res.send({
          status: 200,
          message: 'berhasil memasukan data',
          data: result,
        })
      )
      .catch((err) => res.send({ message: 'error', err }))
  },
  delete: (req, res) => {
    PSProduct.deleteData(req.params.id)
      .then(() =>
        res.send({ status: 200, message: 'berhasil menghapus data' })
      )
      .catch((err) => res.send({ message: 'error', err }));
  },
  getProduct: (req, res) => {
    PSProduct.selectData()
      .then((result) => res.send({ result: result.rows }))
      .catch((err) => res.send({ message: 'error', err }));
  },
  insert: (req, res) => {
    PSProduct.insertData(req.body)
      .then(() =>
        res.send({ status: 200, message: 'berhasil memasukan data' })
      )
      .catch((err) => res.send({ message: 'error', err }));
  }
}
exports.PSController = PSController;