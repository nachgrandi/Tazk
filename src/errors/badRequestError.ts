import BaseError from './baseError';

class BadRequestError extends BaseError {
  constructor (
    description = 'Bad request.',
  ) {
    const statusCode = 400;
    super(statusCode, description);
  }
}

export default BadRequestError;