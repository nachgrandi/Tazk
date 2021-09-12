import TaskDto from '../../dto/task.dto';
import TaskRepository from '../../repository/task.repository';

export const createTask = ( taskRepository: TaskRepository ) => async ( 
  taskToCreate: TaskDto 
) => {

  return taskRepository.save(taskToCreate);
  
};

export const getByDateRange = ( taskRepository: TaskRepository ) => async ( 
  email: string, startDate: Date, endDate: Date
) => {
  
  return taskRepository.getByDateRange(email, startDate, endDate);
  
};

export const updateTask = ( taskRepository: TaskRepository ) => async ( 
  taskToCreate: TaskDto, id: string
) => {
  
  return taskRepository.update(taskToCreate, id);
  
};

export const deleteTask = ( taskRepository: TaskRepository ) => async ( 
  id: string 
) => {

  return taskRepository.delete(id);
  
};