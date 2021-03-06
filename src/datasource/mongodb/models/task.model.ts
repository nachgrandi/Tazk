import { model, Schema, Document } from 'mongoose';
import ImageDto from '../../../core/dto/image.dto';
import TaskDto from '../../../core/dto/task.dto';

export interface ITask extends Document, TaskDto {}

const taskSchema = new Schema({
  userId: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  title: {
    type: String,
    required: true,
    lowercase: false,
    trim: false
  },
  description: {
    type: String,
    required: false,
    lowercase: false,
    trim: false
  },
  dateCreated: {
    type: Date,
    required: true
  },
  category: {
    type: String,
    required: false,
    lowercase: false,
    trim: false
  },
  image: {
    type: [Object],
    required: false
  }
});

export default model<ITask>('Task', taskSchema);