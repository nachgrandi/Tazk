import { Request, Response } from 'express';
import fs from 'fs';
import jwt from 'jsonwebtoken';
import UserService from '../core/service/user/index';

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

export const auth = async (
  req: Request,
  res: Response
): Promise<Response> => {

  if (!req.body.email) {
    return res
      .status(400)
      .json({ msg: 'Email not found.' });
  }

  if (!req.body.googleId) {
    return res
      .status(400)
      .json({ msg: 'Google ID not found.' });
  }

  const isUser = await UserService.authUser( req.body.email, req.body.googleId );

  if (!isUser) {
    return res
      .status(500)
      .json({ msg: 'A problem occurred trying to authenticate the user.' });
  }

  const payload = { email: req.body.email, googleId: req.body.googleId };
  const privateKey : any = fs.readFileSync( './keys/private.pem', 'utf-8' );
  const signOptions : any = { expiresIn: '8h', algorithm: 'RS256'};

  const token : string = jwt.sign( payload, privateKey, signOptions );

  return res.status(201).json({ msg: 'User authenticated successfully.', token });

};
