import UserDto from '../dto/user.dto';

interface UserRepository {
  getByEmail(email : string) : Promise<UserDto | null>
  save(user : UserDto) : Promise<boolean>
}

export default UserRepository;