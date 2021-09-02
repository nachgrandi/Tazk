
import UserDto from '../../dto/user.dto';
import UserRepository from '../../repository/user.repository';

export const createUser = ( userRepository : UserRepository ) => async ( 
  userToCreate : UserDto 
) => {

  const user: UserDto | null = await userRepository.getByEmail( userToCreate.email );

  if (user)
    return false;

  return userRepository.save(userToCreate);
  
};

export const authUser = ( userRepository : UserRepository ) => async ( 
  email : string,
  googleId: string 
) => {

  const user: UserDto | null = await userRepository.getByEmail( email );

  if (user) {
    return userRepository.auth( user.email, googleId );
  }

  return false;
  
};

