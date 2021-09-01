import { ConnectOptions } from 'mongoose';
import config from './config';

const ConnectOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  user: config.DB.USER,
  pass: config.DB.PASSWORD
};

export default ConnectOptions;