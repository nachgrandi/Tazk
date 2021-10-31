import { Request, Response } from 'express';
import UserService from '../core/service/user/index';
import BadRequestError from '../errors/badRequestError';
import BaseError from '../errors/baseError';

export const signInOrSignUp = async (
  req: Request,
  res: Response
): Promise<Response> => {

  try {
    
    if(!req.body.registration_token)
      throw new BadRequestError('The field registration token are necesary.');
    
    await UserService.signInOrSignUp(res.locals.userEmail, req.body.registration_token);
  
    return res.status(201).json({ msg: 'User login successfully.' });
  } catch (error) {

    if (error instanceof BaseError)
      return res
        .status(error.statusCode)
        .json({ msg: error.message });

    return res
        .status(500)
        .json({ msg: 'Internal error occurred trying to login.' });
  }

};

export const updateRegistrationToken = async (
  req: Request,
  res: Response
): Promise<Response> => {

  try {

    if(!req.body.registration_token)
      throw new BadRequestError('The field registration token are necesary.');
    
    await UserService.updateRegistrationToken(res.locals.userEmail, req.body.registration_token);
  
    return res.status(201).json({ msg: 'User registration token update successfully.' });
  } catch (error) {

    if (error instanceof BaseError)
      return res
        .status(error.statusCode)
        .json({ msg: error.message });

    return res
        .status(500)
        .json({ msg: 'Internal error trying to update registration token.' });
  }

};
