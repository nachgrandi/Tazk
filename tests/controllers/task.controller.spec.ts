import { create, deleteTask, update, getByDateRange } from '../../src/controllers/tazk.controller';
import { getMockReq, getMockRes } from '@jest-mock/express';
import TaskService from '../../src/core/service/task/index';
import TaskDto from '../../src/core/dto/task.dto';

describe('POST - Create', () => {
  test('Test create task successfully', async () => {
    TaskService.createTask = jest.fn().mockReturnValue(true);
    const req = getMockReq({
      body: { 
        title: 'some title',
        dateCreated: '2021-01-01'
      }
    });
    const { res } = getMockRes({
      locals: {
        userEmail: 'test@test.com'
      }
    });

    await create(req, res).then(
      (r) => {
        expect(r.json).toHaveBeenCalledWith(
          expect.objectContaining({
            msg: 'Task created successfully.',
          }),
        );
      }
    );
  });

  test('Test create task fails trying to save task', async () => {
    TaskService.createTask = jest.fn().mockRejectedValue(new Error(''));
    const req = getMockReq({
      body: { 
        title: 'some title',
        dateCreated: '2021-01-01'
      }
    });
    const { res } = getMockRes({
      locals: {
        userEmail: 'test@test.com'
      }
    });

    await create(req, res).then(
      (r) => {
        expect(r.json).toHaveBeenCalledWith(
          expect.objectContaining({
            msg: 'A problem occurred trying to create the task.',
          }),
        );
      }
    );
  });

  test('Test create task fails for empty body', async () => {
    TaskService.createTask = jest.fn().mockRejectedValue(new Error(''));
    const req = getMockReq({
      body: {}
    });
    const { res } = getMockRes({
      locals: {
        userEmail: 'test@test.com'
      }
    });

    await create(req, res).then(
      (r) => {
        expect(r.json).toHaveBeenCalledWith(
          expect.objectContaining({
            msg: 'The field email, title and date are necesary.',
          }),
        );
      }
    );
  });
});

describe('PUT - Update', () => {
  test('Test update task successfully', async () => {
    TaskService.updateTask = jest.fn().mockReturnValue(true);
    const req = getMockReq({
      body: { 
        _id: 'aAbBcC123',
        title: 'some title',
        dateCreated: '2021-01-01'
      }
    });
    const { res } = getMockRes({
      locals: {
        userEmail: 'test@test.com'
      }
    });

    await update(req, res).then(
      (r) => {
        expect(r.json).toHaveBeenCalledWith(
          expect.objectContaining({
            msg: 'Task updated successfully.',
          }),
        );
      }
    );
  });

  test('Test update task fails trying to save task', async () => {
    TaskService.updateTask = jest.fn().mockRejectedValue(new Error(''));
    const req = getMockReq({
      body: { 
        _id: 'aAbBcC123',
        title: 'some title',
        dateCreated: '2021-01-01'
      }
    });
    const { res } = getMockRes({
      locals: {
        userEmail: 'test@test.com'
      }
    });

    await update(req, res).then(
      (r) => {
        expect(r.json).toHaveBeenCalledWith(
          expect.objectContaining({
            msg: 'A problem occurred trying to update the task.',
          }),
        );
      }
    );
  });

  test('Test update task fails for empty body', async () => {
    TaskService.updateTask = jest.fn().mockRejectedValue(new Error(''));
    const req = getMockReq({
      body: {}
    });
    const { res } = getMockRes({
      locals: {
        userEmail: 'test@test.com'
      }
    });

    await update(req, res).then(
      (r) => {
        expect(r.json).toHaveBeenCalledWith(
          expect.objectContaining({
            msg: 'The field _id, email, title and dateCreated are necesary.',
          }),
        );
      }
    );
  });
});

describe('GET - getByDateRange', () => {
  test('Test get task successfully', async () => {
    const data: TaskDto = {
      title: 'some title',
      userId: '123123',
      dateCreated: new Date('2021-01-01'),
      description: '',
      category: 'error',
      image: null
    };

    TaskService.getByDateRange = jest.fn().mockReturnValue(data);

    const req = getMockReq({
      query: { 
        startDate: '2021-01-01',
        endDate: '2021-01-02'
      }
    });
    const { res } = getMockRes({
      locals: {
        userEmail: 'test@test.com'
      }
    });

    await getByDateRange(req, res).then(
      (r) => {
        expect(r.json).toHaveBeenCalledWith(
          expect.objectContaining({
            data: data,
          }),
        );
      }
    );
  });

  test('Test get task fails trying to get task', async () => {
    TaskService.getByDateRange = jest.fn().mockRejectedValue(new Error(''));
    const req = getMockReq({
      query: { 
        startDate: '2021-01-01',
        endDate: '2021-01-02'
      }
    });
    const { res } = getMockRes({
      locals: {
        userEmail: 'test@test.com'
      }
    });

    await getByDateRange(req, res).then(
      (r) => {
        expect(r.json).toHaveBeenCalledWith(
          expect.objectContaining({
            msg: 'A problem occurred trying to get tasks.',
          }),
        );
      }
    );
  });

  test('Test get task fails for empty body', async () => {
    TaskService.getByDateRange = jest.fn().mockRejectedValue(new Error(''));
    const req = getMockReq({
      query: {}
    });
    const { res } = getMockRes({
      locals: {
        userEmail: 'test@test.com'
      }
    });

    await getByDateRange(req, res).then(
      (r) => {
        expect(r.json).toHaveBeenCalledWith(
          expect.objectContaining({
            msg: 'The params email, start date and end date are necesary.',
          }),
        );
      }
    );
  });
});

describe('DELETE - Delete', () => {
  test('Test delete task successfully', async () => {
    TaskService.deleteTask = jest.fn().mockReturnValue(true);
    const req = getMockReq({
      query: { 
        id: 'aAbBcC123'
      }
    });
    const { res } = getMockRes({
      locals: {
        userEmail: 'test@test.com'
      }
    });

    await deleteTask(req, res).then(
      (r) => {
        expect(r.json).toHaveBeenCalledWith(
          expect.objectContaining({
            msg: 'Task deleted successfully.',
          }),
        );
      }
    );
  });

  test('Test delete task fails trying to delete task', async () => {
    TaskService.deleteTask = jest.fn().mockRejectedValue(new Error(''));
    const req = getMockReq({
      query: { 
        id: 'aAbBcC123'
      }
    });
    const { res } = getMockRes({
      locals: {
        userEmail: 'test@test.com'
      }
    });

    await deleteTask(req, res).then(
      (r) => {
        expect(r.json).toHaveBeenCalledWith(
          expect.objectContaining({
            msg: 'A problem occurred trying to delete the task.',
          }),
        );
      }
    );
  });

  test('Test delete task fails for empty param', async () => {
    TaskService.createTask = jest.fn().mockRejectedValue(new Error(''));
    const req = getMockReq({
      params: {}
    });
    const { res } = getMockRes({
      locals: {
        userEmail: 'test@test.com'
      }
    });

    await deleteTask(req, res).then(
      (r) => {
        expect(r.json).toHaveBeenCalledWith(
          expect.objectContaining({
            msg: 'The params id is necesary.',
          }),
        );
      }
    );
  });
});
