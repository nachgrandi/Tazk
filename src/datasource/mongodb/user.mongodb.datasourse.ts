import UserDto from '../../core/dto/user.dto';
import userDto from '../../core/dto/user.dto';
import userRepository from '../../core/repository/user.repository';
import DataSourceError from '../../errors/dataSourceError';
import ElementNotFoundError from '../../errors/elementNotFoundError';
import User, { IUser } from './models/user.model';

export default class mongoDataSource implements userRepository {
  async getById(id: string): Promise<userDto> {
    try {

      const user = await User.findOne({ _id: id });
      
      if (!user) 
        throw new ElementNotFoundError('User by id not found');
        
      return user;
      
    } catch (error) {
      throw new DataSourceError(`An error ocurred trying to get user with id ${id}`);
    }
  }
  
  async getIdByEmail(email: string): Promise<string> {
    try {
      const user = await User.findOne({ email: email });
      
      if (!user) 
        throw new ElementNotFoundError('User id by email not found');
        
      return user._id
    } catch (error) {
      throw new DataSourceError(`An error ocurred trying to get user id with email ${email}`);
    }
  }

  async getByEmail(email: string): Promise<UserDto | null> {
    try {

      const user = await User.findOne({ email: email });
      if (user) {
        return user;
      }
      return null;
      
    } catch (error) {
      throw new DataSourceError(`An error ocurred trying to get user dto with email ${email}`);
    }
  }

  async save(user: userDto): Promise<boolean> {
    const newUser = new User(user);
    try {
      await newUser.save();
      return true;
    } catch (error) {
      throw new DataSourceError(`An error ocurred trying to save user ${user}`);
    }
  }

  async update(user: userDto, id: string): Promise<boolean> {
    try {
      await User.findOneAndUpdate({_id : id}, user);
      return true;
    } catch (error) {
      throw new DataSourceError(`An error ocurred trying to update user with id ${id}`);
    }
  }

}