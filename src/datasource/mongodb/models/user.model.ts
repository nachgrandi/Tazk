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
  registrationToken: {
    type: String,
    unique: true,
    required: false
  }
});

export default model<IUser>('User', userSchema);
