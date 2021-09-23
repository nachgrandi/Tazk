import BaseError from './baseError';

class UnauthorizedError extends BaseError {
  constructor (
    statusCode = 401,
    description = 'Unauthorized client.',
  ) {
    super(statusCode, description);
  }
}

export default UnauthorizedError;