import { ITask } from '../../../datasource/mongodb/models/task.model';
import UserDto from '../../dto/user.dto';
import TaskRepository from '../../repository/task.repository';
import UserRepository from '../../repository/user.repository';

const mockSendNotication = ( 
  taskRepository: TaskRepository,
  userRepository: UserRepository
) => async (task: ITask) => {
  const user: UserDto | null = await userRepository.getById(task.userId);

  if (user) {
    task.sentNotification = true;
    taskRepository.update(task, task._id);
  }
}

export default mockSendNotication;