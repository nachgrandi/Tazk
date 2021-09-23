
import UserDto from '../dto/user.dto';

interface UserRepository {
  getByEmail(email : string) : Promise<UserDto | null>
  getIdByEmail(email : string) : Promise<string>
  save(user : UserDto) : Promise<boolean>
}

export default UserRepository;
