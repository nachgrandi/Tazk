import UserDto from "../../../src/core/dto/user.dto";
import User from "../../../src/datasource/mongodb/models/user.model";
import mongoDataSource from "../../../src/datasource/mongodb/mongodb.datasourse";

const dataSource = new mongoDataSource();
let user: UserDto = {
  email: 'some@mail.com',
  showNotification: false,
  timeNotification: 0
}

describe('UserDataSource - ', () => {
  test('Test find any user successfully', async () => {
    User.findOne = jest.fn().mockReturnValue(user)
    
    const result = await dataSource.getByEmail(user.email)
    expect(result).toBe(user)
  });

  test('Test fail to find any user', async () => {
    User.findOne = jest.fn().mockReturnValue(null)
    
    const result = await dataSource.getByEmail(user.email)
    expect(result).toBe(null)
  });

  test('Test save user successfully', async () => {
    jest.spyOn(User.prototype, 'save')
      .mockImplementationOnce(() => Promise.resolve())
    
    const result = await dataSource.save(user)
    expect(result).toBeTruthy;
  });

  test('Test fail to save user', async () => {
    jest.spyOn(User.prototype, 'save')
      .mockImplementationOnce(() => Promise.reject())
    
    const result = await dataSource.save(user)
    expect(result).toBeFalsy;
  });
});