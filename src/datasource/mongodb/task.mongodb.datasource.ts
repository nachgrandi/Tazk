import { CLOUD_SDK_CLIENT_ID } from 'google-auth-library/build/src/auth/googleauth';
import TaskDto from '../../core/dto/task.dto';
import TaskRepository from '../../core/repository/task.repository';
import DataSourceError from '../../errors/dataSourceError';
import Task, { ITask } from './models/task.model';

export default class mongoDataSource implements TaskRepository {

  async getNextNotifications(rangeTime: Date): Promise<ITask[] | null> {
    try {
      const now = new Date();
      const hours = now.getHours() -3;

      now.setHours(hours);
      const tasks = Task.find(
        {
          sentNotification: false,
          notificationDate: { 
            $gte: now, 
            $lte: rangeTime 
          }
        }
      );
      
      if (tasks) 
        return tasks;
      
      return null;
    } catch (error) {
      throw new DataSourceError("An error ocurred trying to get task for notifications.");
    }
  }

 
  async getByDateRange(userId: string, startDate: Date, endDate: Date): Promise<TaskDto[] | null> {
    
    try {
      const tasks = Task.find(
        {
          userId: userId,
          date: { 
            $gte: startDate, 
            $lte: endDate 
          }
        }
      );
      
      if (tasks) 
        return tasks;
      
      return null;
    } catch (error) {
      throw new DataSourceError("An error ocurred trying to get task for date range.");
    }
      
  }

  async getByDateRangeAndCategory(userId: string, startDate: Date, endDate: Date, category: string): Promise<TaskDto[] | null> {
    
    try {
      const tasks = Task.find(
        {
          userId: userId,
          date: { 
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
      throw new DataSourceError("An error ocurred trying to get task for date range and category.");
    }
      
  }

  async save (task: TaskDto): Promise<void> {
    const newTask = new Task(task);
    try {
      await newTask.save();
    } catch (error) {
      throw new Error("An error ocurred trying to save task.");
    }
  }

  async update(task: TaskDto, id: string): Promise<void> {
    try {
      await Task.findOneAndUpdate({_id : id}, task);
    } catch (error) {
      throw new DataSourceError(`An error ocurred trying to update task with id ${id}.`);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await Task.findOneAndDelete({_id : id});
    } catch (error) {
      throw new Error(`An error ocurred trying to delete task with id ${id}.`);
    }
  }
}