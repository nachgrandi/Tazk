
import userMongoDataSource from '../../../datasource/mongodb/user.mongodb.datasourse';

import {
  signInOrSignUp
} from './user.service';

const userRepository = new userMongoDataSource();

export default class UserService {
  static signInOrSignUp = signInOrSignUp(userRepository);
}
