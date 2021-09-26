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

  const res = await taskRepository.save(taskToCreate);

  if ( !res )
    throw new Error('An error occurred trying to create the task.');
  
  return;
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

  const res = await taskRepository.update(taskToCreate, id);

  if ( !res )
    throw new Error('An error occurred trying to update the task.');
  
  return;
  
};

export const deleteTask = ( taskRepository: TaskRepository ) => async ( 
  id: string 
) => {

  const res = await taskRepository.delete(id);

  if ( !res )
    throw new Error('An error occurred trying to delete the task.');
  
  return;
  
};