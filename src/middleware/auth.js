const createError = require('http-errors');
const jwt = require('jsonwebtoken');
const protect = (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(token, process.env.JWT_KEY);
      req.decoded = decoded;
      next();
    } else {
      next(createError(400, 'server need token'));
    }
  } catch (error) {
    console.log(error);
    if (error && error.name === 'JsonWebTokenError') {
      next(createError(400, 'token invalid'));
    } else if (error && error.name === 'TokenExpiredError') {
      next(createError(400, 'token expired'));
    } else {
      next(createError(400, 'token not active'));
    }
  }
};

const isSeller = (req, res, next) => {
  if (req.decoded.role !== 'seller') {
    return next(createError(400, 'seller only'));
  }
  next();
};
const isUser = (req, res, next) => {
  if (req.decoded.role !== 'user') {
    return next(createError(400, 'user only'));
  }
  next();
};
module.exports = {
  protect,
  isSeller,
  isUser,
};
