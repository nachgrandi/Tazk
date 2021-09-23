import userDto from '../../core/dto/user.dto';
import userRepository from '../../core/repository/user.repository';
import ElementNotFoundError from '../../errors/elementNotFoundError';
import User from './models/user.model';

export default class mongoDataSource implements userRepository {
  
  async getIdByEmail(email: string): Promise<string> {
    const user = await User.findOne({ email: email });
    
    if (!user) 
      throw new ElementNotFoundError(404, 'User not found');
      
    return user._id;
  }

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
      await newUser.save();
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

}