import UserDto from "../dto/user.dto";


export default interface UserRepository {
  getByEmail(email : String) : Promise<UserDto | null>;
  save(user : UserDto) : Promise<Boolean>;
}