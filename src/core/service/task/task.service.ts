import TaskDto from '../../dto/task.dto';
import TaskRepository from '../../repository/task.repository';

export const createTask = ( taskRepository: TaskRepository ) => async ( 
  taskToCreate: TaskDto 
) => {

  const res = await taskRepository.save(taskToCreate);

  if ( !res )
    throw new Error('An error occurred trying to create the task.');
  
  return;
};

export const getByDateRange = ( taskRepository: TaskRepository ) => async ( 
  email: string, startDate: Date, endDate: Date
) => {
  
  return taskRepository.getByDateRange(email, startDate, endDate);
  
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