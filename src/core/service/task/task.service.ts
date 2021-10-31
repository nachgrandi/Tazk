import TaskDto from '../../dto/task.dto';
import TaskRepository from '../../repository/task.repository';
import UserRepository from '../../repository/user.repository';

export const createTask = ( 
  taskRepository: TaskRepository,
  userRepository: UserRepository
) => async ( 
  taskToCreate: TaskDto,
  email: string
) => {
  const userId = await userRepository.getIdByEmail(email);

  taskToCreate.userId = userId;
  taskToCreate.sentNotification = false;

  await taskRepository.save(taskToCreate);
};

export const getByDateRange = ( 
  taskRepository: TaskRepository,
  userRepository: UserRepository
) => async ( 
  email: string, startDate: Date, endDate: Date, category: string | null
) => {
  const userId = await userRepository.getIdByEmail(email);
  
  if (category)
    return taskRepository.getByDateRangeAndCategory(userId, startDate, endDate, category);

  return taskRepository.getByDateRange(userId, startDate, endDate);
};

export const updateTask = ( taskRepository: TaskRepository ) => async ( 
  taskToCreate: TaskDto, id: string
) => {
  await taskRepository.update(taskToCreate, id);
};

export const deleteTask = ( taskRepository: TaskRepository ) => async ( 
  id: string 
) => {
  await taskRepository.delete(id);
};