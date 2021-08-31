import UserDto from "../dto/user.dto";


export default interface UserRepository {
  getByEmail(email : string) : Promise<UserDto | null>;
  save(user : UserDto) : Promise<boolean>;
}