
import UserDto from "../../dto/user.dto";
import UserRepository from "../../repository/user.repository";

const createUser = ( userRepository : UserRepository ) => async ( 
  userToCreate : UserDto 
) => {
  const user: UserDto | null = await userRepository.getByEmail(userToCreate.email);

  if (user)
    return false;

  return userRepository.save(userToCreate);
}

export default createUser;