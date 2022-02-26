const { UNAUTHORIZED_ERR_CODE } = require('../utils/constants');

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = UNAUTHORIZED_ERR_CODE;
  }
}

module.exports = UnauthorizedError;
