import mongoDataSource from '../../../src/datasource/mongodb/task.mongodb.datasource';
import { createTask, getByDateRange, updateTask, deleteTask } from '../../../src/core/service/task/task.service';
import TaskDto from '../../../src/core/dto/task.dto';

const dataSource = new mongoDataSource();
const task: TaskDto = {
  title: 'some title',
  email: 'some@email.com',
  dateCreated: new Date('2021-01-01'),
  description: ''
};

class service {
  static createTask = createTask(dataSource)
  static getByDateRange = getByDateRange(dataSource)
  static updateTask = updateTask(dataSource)
  static deleteTask = deleteTask(dataSource)
}

describe('TaskService - create', () => {
  test('Test create task successfully', async () => {
    dataSource.save = jest.fn().mockReturnValue(true);
    expect(service.createTask(task)).not.toThrow;
  });
  test('Test create task fail', async () => {
    dataSource.save = jest.fn().mockReturnValue(false);
    try {
      await service.createTask(task);
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
    const result = await service.getByDateRange('some@email.com', new Date(), new Date());
    expect(result).toStrictEqual([task]);
  });
  test('Test get tasks fail', async () => {
    dataSource.getByDateRange = jest.fn().mockReturnValue(null);
    const result = await service.getByDateRange('some@email.com', new Date(), new Date());
    expect(result).toStrictEqual(null);
  });
});