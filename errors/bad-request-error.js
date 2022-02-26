const { NOT_FOUND_ERR_CODE } = require('../utils/constants');

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = NOT_FOUND_ERR_CODE;
  }
}

module.exports = BadRequestError;
