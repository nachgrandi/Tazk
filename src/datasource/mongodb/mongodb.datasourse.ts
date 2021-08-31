import userDto from '../../core/dto/user.dto';
import userRepository from '../../core/repository/user.repository'
import User from './models/user.model';

export default class mongoDataSource implements userRepository {

  async getByEmail(email: string): Promise<userDto | null> {
    const user = await User.findOne({ email: email });
    if (user) {
      return user;
    }
    return null;
  }

  async save(user: userDto): Promise<boolean> {
    const newUser = new User(user);
    try {
      await newUser.save()
      return true
    } catch (error) {
      console.error(error);
      return false;
    }
  }

}