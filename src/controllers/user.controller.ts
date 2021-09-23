import { Request, Response } from 'express';
import UserService from '../core/service/user/index';

export const signInOrSignUp = async (
  req: Request,
  res: Response
): Promise<Response> => {

  try {
    const isLogged = await UserService.signInOrSignUp( res.locals.userEmail );
  
    if (!isLogged) {
      return res
        .status(500)
        .json({ msg: 'A problem occurred trying to login.' });
    }
  
    return res.status(201).json({ msg: 'User login successfully.' });
  } catch (error) {
    return res
        .status(500)
        .json({ msg: 'A problem occurred trying to login.' });
  }

};
