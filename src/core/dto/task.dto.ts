import ImageDto from './image.dto';

interface TaskDto{
  userId: string
  date: Date
  title: string
  description: string
  category: string
  image: [ImageDto] | null
  sentNotification: boolean
  notificationDate: Date
}

export default TaskDto;