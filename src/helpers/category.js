const validateCategory = (req, res, next) => {
  const { name } = req.body;
  const err = [];
  try {
    if (!name || !isNaN(name) || name.length < 4) {
      err.push('name must more than 4  character');
    }

    next();
  } catch (e) {
    err.status = 404;
    next(err);
  }
};

module.exports = { validateCategory };
