import BaseError from '../../../errors/baseError';
import DataSourceError from '../../../errors/dataSourceError';
import ElementNotFoundError from '../../../errors/elementNotFoundError';
import UserDto from '../../dto/user.dto';
import UserRepository from '../../repository/user.repository';

export const signInOrSignUp = ( userRepository : UserRepository ) => async ( 
  email: string,
  registrationToken: string
) => {

  const userToCreate: UserDto = {
    email,
    registrationToken
  };

  try {
    
    const user: string = await userRepository.getIdByEmail( userToCreate.email );

    return userRepository.update(userToCreate, user);

  } catch (error) {
    console.log('error')
    if (error instanceof ElementNotFoundError) {
      console.log(`error`, error)
       return userRepository.save(userToCreate);
    }

    if (error instanceof DataSourceError) {
      throw new DataSourceError(error.message);
    }

    throw new BaseError(500, 'Unexpected error');
    
  }
  
};

export const updateRegistrationToken = ( userRepository : UserRepository ) => async ( 
  email: string,
  registrationToken: string
) => {

  const userToUpdate: UserDto = {
    email,
    registrationToken
  };

  const userId: string = await userRepository.getIdByEmail( userToUpdate.email );
  return userRepository.update(userToUpdate, userId);
  
};
