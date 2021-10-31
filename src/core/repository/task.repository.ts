import { ITask } from '../../datasource/mongodb/models/task.model';
import TaskDto from '../dto/task.dto';

interface TaskRepository {
  getByDateRange(email : string, startDate: Date, endDate: Date) : Promise<TaskDto[] | null>
  getByDateRangeAndCategory(email : string, startDate: Date, endDate: Date, category: string) : Promise<TaskDto[] | null>
  getNextNotifications(rangeTime: Date) : Promise<ITask[] | null>
  save(task: TaskDto): Promise<void>
  update(task: TaskDto, id: string): Promise<void>
  delete(id: string): Promise<void>
}

export default TaskRepository;