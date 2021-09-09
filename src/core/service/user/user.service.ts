
import UserDto from '../../dto/user.dto';
import UserRepository from '../../repository/user.repository';
import jwt from 'jsonwebtoken';
import config from '../../../config/config';
import ElementNotFoundError from '../../../errors/elementNotFoundError';

export const createUser = ( userRepository : UserRepository ) => async ( 
  userToCreate : UserDto 
) => {

  const user: UserDto | null = await userRepository.getByEmail( userToCreate.email );

  if (user)
    return false;

  return userRepository.save(userToCreate);
  
};

export const singIn = ( userRepository : UserRepository ) => async ( 
  email : string,
) => {

  const user: UserDto | null = await userRepository.getByEmail( email );
  if (!user) 
    throw new ElementNotFoundError();

  const payload = { email: email, time: new Date().getTime };
  const token : string = jwt.sign( payload, config.jwtSecret );

  return token;
  
};
