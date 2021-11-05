import { ITask } from '../../../datasource/mongodb/models/task.model';
import TaskRepository from '../../repository/task.repository';
import UserRepository from '../../repository/user.repository';
import { sendNotification } from '../firebase/index';

export const fetchAndSentNotifications = ( 
  taskRepository: TaskRepository,
  userRepository: UserRepository
) => async () => {

  const rangeTime = new Date();
  const hours = rangeTime.getHours() - 3;
  const minutes = rangeTime.getMinutes() + 10;

  rangeTime.setHours(hours);
  rangeTime.setMinutes(minutes);
  console.log(`pepe`)
  const tasks: ITask[] | null = await taskRepository.getNextNotifications(rangeTime);
  console.log(`tasks`, tasks, rangeTime)
  if (tasks)
    tasks.map(
      (x) => sendNotification(taskRepository, userRepository)(x)
    )
}

 