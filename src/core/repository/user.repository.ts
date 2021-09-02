import UserDto from '../dto/user.dto';

interface UserRepository {
  getByEmail(email : string) : Promise<UserDto | null>
  save(user : UserDto) : Promise<boolean>
  auth(email: string, googleId:string) : Promise<UserDto>
}

export default UserRepository;