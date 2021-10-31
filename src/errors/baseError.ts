class BaseError extends Error {
  
  statusCode: number;

  constructor (statusCode: number, description: string) {
    super(description);
  
    Object.setPrototypeOf(this, new.target.prototype);
    this.statusCode = statusCode;
    Error.captureStackTrace(this);
    console.error(this.stack)
  }
 }
 
 export default BaseError;