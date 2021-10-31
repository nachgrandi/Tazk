import BaseError from './baseError';

class DataSourceError extends BaseError {
  constructor (
    description = 'An error with datasource ocurred.',
  ) {
    const statusCode = 500;
    super(statusCode, description);
  }
}

export default DataSourceError;