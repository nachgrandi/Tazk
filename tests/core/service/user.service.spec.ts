import UserDto from '../../../src/core/dto/user.dto';
import createUser from '../../../src/core/service/user/user.service';
import mongoDataSource from '../../../src/datasource/mongodb/mongodb.datasourse';

const dataSource = new mongoDataSource();
const user: UserDto = {
  email: 'some@mail.com',
  showNotification: false,
  timeNotification: 0
};
const createUserService = createUser(dataSource);

describe('UserService - ', () => {
  test('Test create user successfully', async () => {
    dataSource.save = jest.fn().mockReturnValue(true);
    dataSource.getByEmail = jest.fn().mockReturnValue(null);
    const result = await createUserService(user);
    expect(result).toBe(true);
  });
  test('Test create user fail for user exist in db', async () => {
    dataSource.getByEmail = jest.fn().mockReturnValue(user);
    const result = await createUserService(user);
    expect(result).toBe(false);
  });
});