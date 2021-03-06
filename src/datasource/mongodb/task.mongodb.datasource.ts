import TaskDto from '../../core/dto/task.dto';
import TaskRepository from '../../core/repository/task.repository';
import Task from './models/task.model';

export default class mongoDataSource implements TaskRepository {

 
  async getByDateRange(userId: string, startDate: Date, endDate: Date): Promise<TaskDto[] | null> {
    
    try {
      const tasks = Task.find(
        {
          userId: userId,
          dateCreated: { 
            $gte: startDate, 
            $lte: endDate 
          }
        }
      );
      
      if (tasks) 
        return tasks;
      
      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
      
  }

  async getByDateRangeAndCategory(userId: string, startDate: Date, endDate: Date, category: string): Promise<TaskDto[] | null> {
    
    try {
      const tasks = Task.find(
        {
          userId: userId,
          dateCreated: { 
            $gte: startDate, 
            $lte: endDate 
          },
          category: category
        }
      );
      
      if (tasks) 
        return tasks;
      
      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
      
  }

  async save (task: TaskDto): Promise<boolean> {
    const newTask = new Task(task);
    try {
      await newTask.save();
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async update(task: TaskDto, id: string): Promise<boolean> {
    try {
      await Task.findOneAndUpdate({_id : id}, task);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      await Task.findOneAndDelete({_id : id});
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}