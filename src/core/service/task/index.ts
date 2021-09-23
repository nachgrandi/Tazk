import TaskRepository from '../../../datasource/mongodb/task.mongodb.datasource';
import UserMongoDataSource from '../../../datasource/mongodb/user.mongodb.datasourse';
import {
  createTask, deleteTask, getByDateRange, updateTask
} from './task.service';

const taskRepository = new TaskRepository();
const userRepository = new UserMongoDataSource();

export default class TaskService {
  static createTask = createTask(taskRepository, userRepository);
  static updateTask = updateTask(taskRepository);
  static getByDateRange = getByDateRange(taskRepository, userRepository);
  static deleteTask = deleteTask(taskRepository);
}
