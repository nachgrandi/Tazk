import BaseError from "./baseError"

class ElementNotFoundError extends BaseError {
  constructor (
    statusCode = 401,
    description = 'Element not found.',
  ) {
    super(statusCode, description)
  }
}

export default ElementNotFoundError;