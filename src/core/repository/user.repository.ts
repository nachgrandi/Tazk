
import UserDto from '../dto/user.dto';

interface UserRepository {
  getByEmail(email: string): Promise<UserDto | null>
  getIdByEmail(email: string): Promise<string>
  getById(id: string): Promise<UserDto>
  save(user: UserDto): Promise<boolean>
  update(user: UserDto, id: string): Promise<boolean>
}

export default UserRepository;
