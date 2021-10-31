import BaseError from './baseError';

class UnauthorizedError extends BaseError {
  constructor (
    description = 'Unauthorized client.',
  ) {
    const statusCode = 401;
    super(statusCode, description);
  }
}

export default UnauthorizedError;