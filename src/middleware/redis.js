const client = require('../config/redis');
const { response } = require('../helpers/common');

const hitCacheProductDetail = async (req, res, next) => {
  const idProduct = req.params.id;
  const product = await client.get(`product/${idProduct}`);
  if (product) {
    return response(res, JSON.parse(product), 200, 'get data from redis');
  }
  next();
};

const clearCacheProductDetail = (req, res, next) => {
  const idProduct = req.params.id;
  client.del(`product/${idProduct}`);
};
module.exports = {
  hitCacheProductDetail,
  clearCacheProductDetail,
};
