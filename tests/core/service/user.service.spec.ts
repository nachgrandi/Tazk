import UserDto from '../../../src/core/dto/user.dto';
import { signInOrSignUp } from '../../../src/core/service/user/user.service';
import mongoDataSource from '../../../src/datasource/mongodb/user.mongodb.datasourse';

const dataSource = new mongoDataSource();
const user: UserDto = {
  email: 'some@mail.com',
  showNotification: false,
  timeNotification: 0
};
const createUserService = signInOrSignUp(dataSource);

describe('UserService - singUp', () => {
  test('Test login and create user successfully', async () => {
    dataSource.save = jest.fn().mockReturnValue(true);
    dataSource.getByEmail = jest.fn().mockReturnValue(null);
    const result = await createUserService(user.email);
    expect(result).toBe(true);
  });
  test('Test login user successfully', async () => {
    dataSource.getByEmail = jest.fn().mockReturnValue(user);
    const result = await createUserService(user.email);
    expect(result).toBe(true);
  });
});