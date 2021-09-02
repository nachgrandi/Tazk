
import mongoDataSource from '../../../datasource/mongodb/mongodb.datasourse';

import {
  createUser,
  authUser
} from './user.service';

const userRepository = new mongoDataSource();

export default class UserService {
  static createUser = createUser(userRepository);
  static authUser = authUser(userRepository);
}
