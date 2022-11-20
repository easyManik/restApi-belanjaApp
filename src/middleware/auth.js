const jwt = require('jsonwebtoken');
const { common } = require('./common');

const key = process.env.JWT_KEY;

const role = (req, res, next) => {
  if (req.params.role == 'toko' || req.params.role == 'cust') {
    return next();
  }
  return common(res, 404, false, null, 'wrong role users');
};

const roleToko = (req, res, next) => {
  let token;
  const auth = req.headers.authorization;
  token = auth.split(' ')[1];
  const decode = jwt.verify(token, key);
  const role = decode.role;
  if (role == 'toko') {
    return next();
  }
  return common(res, 404, false, null, 'user not toko');
};

const protect = (req, res, next) => {
  try {
    let token;
    if (req.headers.authorization) {
      const auth = req.headers.authorization;
      token = auth.split(' ')[1];
      const decode = jwt.verify(token, key);
      req.payload = decode;
      next();
    } else {
      return common(res, 404, false, null, 'server need token');
    }
  } catch (err) {
    console.log(err);
    if (err && err.name == 'JsonWebTokenError') {
      return common(res, 404, false, null, 'invalid token');
    }
    if (err && err.name == 'TokenExpriredError') {
      return common(res, 404, false, null, 'expired token');
    }
    return common(res, 404, false, null, 'token not active');
  }
};

module.exports = { role, protect };
