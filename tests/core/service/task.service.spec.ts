import mongoDataSource from '../../../src/datasource/mongodb/task.mongodb.datasource';
import userMongoDataSource from '../../../src/datasource/mongodb/user.mongodb.datasourse';
import { createTask, getByDateRange, updateTask, deleteTask } from '../../../src/core/service/task/task.service';
import TaskDto from '../../../src/core/dto/task.dto';

const dataSource = new mongoDataSource();
const userDataSource = new userMongoDataSource();
const task: TaskDto = {
  title: 'some title',
  userId: '123123',
  date: new Date('2021-01-01'),
  description: '',
  category: 'error',
  image: null,
  sentNotification: false,
  notificationDate: new Date('2021-01-01')
};
const email = 'test@test.com';

class service {
  static createTask = createTask(dataSource, userDataSource)
  static getByDateRange = getByDateRange(dataSource, userDataSource)
  static updateTask = updateTask(dataSource)
  static deleteTask = deleteTask(dataSource)
}

describe('TaskService - create', () => {

  test('Test create task successfully', async () => {
    dataSource.save = jest.fn().mockReturnValue(true);
    userDataSource.getIdByEmail = jest.fn().mockReturnValue('123123');
    expect(service.createTask(task, email)).not.toThrow;
  });

  test('Test create task fail', async () => {
    dataSource.save = jest.fn().mockReturnValue(false);
    userDataSource.getIdByEmail = jest.fn().mockReturnValue('123123');
    try {
      await service.createTask(task, email);
    } catch (error) {
      expect(error).toStrictEqual(new Error('An error occurred trying to create the task.'));
    }
  });
});

describe('TaskService - update', () => {

  test('Test update task successfully', async () => {
    dataSource.update = jest.fn().mockReturnValue(true);
    expect(service.updateTask(task, 'aAbBcC123')).not.toThrow;
  });

  test('Test update task fail', async () => {
    dataSource.update = jest.fn().mockReturnValue(false);
    try {
      await service.updateTask(task, 'aAbBcC123');
    } catch (error) {
      expect(error).toStrictEqual(new Error('An error occurred trying to update the task.'));
    }
  });
});

describe('TaskService - delete', () => {
  test('Test create task successfully', async () => {
    dataSource.delete = jest.fn().mockReturnValue(true);
    expect(service.deleteTask('aAbBcC123')).not.toThrow;
  });
  test('Test create task fail', async () => {
    dataSource.delete = jest.fn().mockReturnValue(false);
    try {
      await service.deleteTask('aAbBcC123');
    } catch (error) {
      expect(error).toStrictEqual(new Error('An error occurred trying to delete the task.'));
    }
  });
});

describe('TaskService - getByDateRange', () => {
  test('Test get tasks successfully', async () => {
    dataSource.getByDateRange = jest.fn().mockReturnValue([task]);
    userDataSource.getIdByEmail = jest.fn().mockReturnValue('123123');
    const result = await service.getByDateRange('some@email.com', new Date(), new Date(), null);
    expect(result).toStrictEqual([task]);
  });
  test('Test get tasks fail', async () => {
    dataSource.getByDateRangeAndCategory = jest.fn().mockReturnValue(null);
    userDataSource.getIdByEmail = jest.fn().mockReturnValue('123123');
    const result = await service.getByDateRange('some@email.com', new Date(), new Date(), 'error');
    expect(result).toStrictEqual(null);
  });
});