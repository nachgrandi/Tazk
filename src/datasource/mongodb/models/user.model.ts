import { model, Schema, Document } from 'mongoose';
import UserDto from '../../../core/dto/user.dto';

export interface IUser extends Document, UserDto {}

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    trim: true
  },
  showNotification: {
    type: Boolean,
    required: false
  },
  timeNotification: {
    type: Number,
    required: false
  }
});

export default model<IUser>('User', userSchema);
