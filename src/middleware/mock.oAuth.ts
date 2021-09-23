import { Request, Response, NextFunction } from 'express';
import UnauthorizedError from "../errors/unauthorizedError";

export const mockAuth =  async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log(req.headers.idtoken)

    if (!req.headers || !req.headers.idtoken )
      throw new UnauthorizedError();

    res.locals.userEmail = req.headers.idtoken ;

    next();
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      return res
        .status(error.statusCode)
        .json({ 
          msg: error.message
       });
    }
    
    return res
      .status(500)
      .json({ msg: 'A problem occurred trying to authenticate the user.' });
  }
}
