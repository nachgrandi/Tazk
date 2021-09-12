import TaskRepository from '../../../datasource/mongodb/task.mongodb.datasource';
import {
  createTask, deleteTask, getByDateRange, updateTask
} from './task.service';

const taskRepository = new TaskRepository();

export default class TaskService {
  static createTask = createTask(taskRepository);
  static updateTask = updateTask(taskRepository);
  static getByDateRange = getByDateRange(taskRepository);
  static deleteTask = deleteTask(taskRepository);
}
