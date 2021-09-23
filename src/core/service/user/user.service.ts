
import UserDto from '../../dto/user.dto';
import UserRepository from '../../repository/user.repository';

export const signInOrSignUp = ( userRepository : UserRepository ) => async ( 
  email : string 
) => {

  const userToCreate: UserDto = {
    email,
    showNotification: false,
    timeNotification: 0
  };

  const user: UserDto | null = await userRepository.getByEmail( userToCreate.email );

  if (user)
    return true;

  return userRepository.save(userToCreate);
  
};
