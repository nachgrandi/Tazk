import { fetchAndSentNotifications } from "./notifications.service";
import TaskRepository from '../../../datasource/mongodb/task.mongodb.datasource';
import UserMongoDataSource from '../../../datasource/mongodb/user.mongodb.datasourse';

const taskRepository = new TaskRepository();
const userRepository = new UserMongoDataSource();

class NotificationService {
  static fetchAndSentNotifications = fetchAndSentNotifications(taskRepository, userRepository);
}

NotificationService.fetchAndSentNotifications();
