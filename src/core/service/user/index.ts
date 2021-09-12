
import userMongoDataSource from '../../../datasource/mongodb/user.mongodb.datasourse';

import {
  createUser,
  singIn
} from './user.service';

const userRepository = new userMongoDataSource();

export default class UserService {
  static createUser = createUser(userRepository);
  static singIn = singIn(userRepository);
}
