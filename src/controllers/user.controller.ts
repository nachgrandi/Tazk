import { Request, Response } from 'express';
import UserService from '../core/service/user/index';
import ElementNotFoundError from '../errors/elementNotFoundError';

export const signUp = async (
  req: Request,
  res: Response
): Promise<Response> => {

  if (!req.body.email) {
    return res
      .status(400)
      .json({ msg: 'Email not found.' });
  }

  const isCreated = await UserService.createUser( req.body );

  if (!isCreated) {
    return res
      .status(500)
      .json({ msg: 'A problem occurred trying to create the user.' });
  }

  return res.status(201).json({ msg: 'User created successfully.' });

};

export const singIn = async (
  req: Request,
  res: Response
): Promise<Response> => {

  if (!req.body.email) {
    return res
      .status(400)
      .json({ msg: 'Email not found.' });
  }

  try {
    const jwt = await UserService.singIn( req.body.email );

    return res.status(201).json({ msg: 'User authenticated successfully.', jwt });
  } catch (e) {

    if (e instanceof ElementNotFoundError) {
      return res
        .status(e.statusCode)
        .json({ msg: e.message });
    }

    return res
      .status(500)
      .json({ msg: 'A problem occurred trying to authenticate the user.' });
  }

  

  

};
