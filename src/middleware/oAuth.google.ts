import { OAuth2Client } from 'google-auth-library';
import { Request, Response, NextFunction } from 'express';
import UnauthorizedError from '../errors/unauthorizedError';
import config from '../config/config';

const client = new OAuth2Client(config.clientId);

export const oAuth =  async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {

    if (!req.headers || !req.headers.idtoken || !(typeof req.headers.idtoken === 'string') )
      throw new UnauthorizedError();

    const idToken: string = req.headers.idtoken;

    const ticket = await client.verifyIdToken({
        idToken: idToken,
        audience: config.mobileClientId,
    }).catch((e) => {
      throw new UnauthorizedError(e.message);
    });

    const payload = ticket.getPayload();
    
    if (!payload || !payload['email'])
      throw new UnauthorizedError();

    res.locals.userEmail = payload['email'] ;

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
};
