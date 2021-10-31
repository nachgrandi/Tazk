import BaseError from './baseError';

class ElementNotFoundError extends BaseError {
  constructor (
    description = 'Element not found.',
  ) {
    const statusCode = 404;
    super(statusCode, description);
  }
}

export default ElementNotFoundError;