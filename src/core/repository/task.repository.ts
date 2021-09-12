import TaskDto from '../dto/task.dto';

interface TaskRepository {
  getByDateRange(email : string, startDate: Date, endDate: Date) : Promise<TaskDto[] | null>
  save(task: TaskDto) : Promise<boolean>
  update(task: TaskDto, id: string) : Promise<boolean>
  delete(id: string) : Promise<boolean>
}

export default TaskRepository;