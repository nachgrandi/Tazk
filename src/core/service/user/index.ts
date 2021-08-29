import mongoDataSource from "../../../datasource/mongodb/mongodb.datasourse";
import createUser from "./user.service";

const userRepository = new mongoDataSource();

export default class UserService {
  static createUser = createUser(userRepository);
}