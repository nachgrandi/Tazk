import ImageDto from './image.dto';

interface TaskDto {
  userId: string
  dateCreated: Date
  title: string
  description: string
  category: string
  image: [ImageDto] | null
}

export default TaskDto;