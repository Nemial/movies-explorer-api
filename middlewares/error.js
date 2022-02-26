const { DEFAULT_ERR_CODE } = require('../utils/constants');

module.exports = (err, req, res, next) => {
  const { statusCode = DEFAULT_ERR_CODE, message } = err;
  res.status(statusCode).send({
    message: statusCode === DEFAULT_ERR_CODE ? 'На сервере произошла ошибка' : message,
  });
  next();
};
