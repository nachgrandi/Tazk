import TaskDto from '../../../src/core/dto/task.dto';
import Task from '../../../src/datasource/mongodb/models/task.model';
import mongoDataSource from '../../../src/datasource/mongodb/task.mongodb.datasource';


const dataSource = new mongoDataSource();
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

describe('TaskDataSource - ', () => {
  test('Test save task successfully', async () => {
    jest.spyOn(Task.prototype, 'save')
      .mockImplementationOnce(() => Promise.resolve());
    
    const result = await dataSource.save(task);
    expect(result).toBe(true);
  });

  test('Test fail to save task', async () => {
    jest.spyOn(Task.prototype, 'save')
      .mockImplementationOnce(() => Promise.reject('Error'));
    
    const result = await dataSource.save(task);
    expect(result).toBe(false);
  });

  test('Test update task successfully', async () => {

    Task.findOneAndUpdate = jest.fn();
    
    const result = await dataSource.update(task, '');
    expect(result).toBe(true);
  });

  test('Test fail to update task', async () => {
    Task.findOneAndUpdate = jest.fn().mockRejectedValue('error');
    
    const result = await dataSource.update(task, '');
    expect(result).toBe(false);
  });

  test('Test delete task successfully', async () => {

    Task.findOneAndDelete = jest.fn();
    
    const result = await dataSource.delete('');
    expect(result).toBe(true);
  });

  test('Test fail to delete task', async () => {
    Task.findOneAndDelete = jest.fn().mockRejectedValue('error');
    
    const result = await dataSource.delete('');
    expect(result).toBe(false);
  });

  test('Test get task successfully', async () => {

    Task.find = jest.fn().mockResolvedValue([task]);
    
    const result = await dataSource.getByDateRange('some@email.com', new Date(), new Date());
    expect(result).toStrictEqual([task]);
  });

  test('Test get task successfully but is null', async () => {

    Task.find = jest.fn().mockResolvedValue(null);
    
    const result = await dataSource.getByDateRange('some@email.com', new Date(), new Date());
    expect(result).toBe(null);
  });

  test('Test fail to get task', async () => {
    Task.find = jest.fn().mockImplementation(() => {
      throw new Error();
    });
    
    const result = await dataSource.getByDateRange('some@email.com', new Date(), new Date());
    expect(result).toBe(null);
  });
  test('Test get task with category successfully', async () => {

    Task.find = jest.fn().mockResolvedValue([task]);
    
    const result = await dataSource.getByDateRangeAndCategory('some@email.com', new Date(), new Date(), 'error');
    expect(result).toStrictEqual([task]);
  });

  test('Test get task successfully but is null', async () => {

    Task.find = jest.fn().mockResolvedValue(null);
    
    const result = await dataSource.getByDateRangeAndCategory('some@email.com', new Date(), new Date(), 'error');
    expect(result).toBe(null);
  });

  test('Test fail to get task', async () => {
    Task.find = jest.fn().mockImplementation(() => {
      throw new Error();
    });
    
    const result = await dataSource.getByDateRangeAndCategory('some@email.com', new Date(), new Date(), 'error');
    expect(result).toBe(null);
  });
});