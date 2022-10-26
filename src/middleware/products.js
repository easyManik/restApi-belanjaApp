const product = (req, res, next) => {
  const {
    name, stock, price, category_id,
  } = req.body;
  try {
    if (name === '') throw new Error('Nama kosong, silahkan masukkan nama!');
    if (stock === 0) throw new Error('Stock kosong, silahkan masukkan stock barang!');
    if (price === 0) throw new Error('Harga kosong, silahkan masukkan harga barang!');
    if (category_id === 0) throw new Error('ID category kosong, silahkan masukkan ID');
  } catch (e) {
    return res.status(404).json({ status: 404, messages: `${e}` });
  } next();
};
module.exports = { product };
