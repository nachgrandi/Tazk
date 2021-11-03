import { ITask } from '../../../datasource/mongodb/models/task.model';
import UserDto from '../../dto/user.dto';
import TaskRepository from '../../repository/task.repository';
import UserRepository from '../../repository/user.repository';
import config from '../../../config/config';
import admin from 'firebase-admin';

const key = {
  type: "service_account",
  projectId: config.keyFirebase.projectId,
  privateKeyId: config.keyFirebase.privateKeyId,
  privateKey: config.keyFirebase.privateKey,
  clientEmail: config.keyFirebase.clientEmail,
  clientId: config.keyFirebase.clientId,
  authUri: "https://accounts.google.com/o/oauth2/auth",
  tokenUri: "https://oauth2.googleapis.com/token",
  authProviderX509CertUrl: "https://www.googleapis.com/oauth2/v1/certs",
  clientX509CertUrl: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-s7kud%40tazk-1630450146860.iam.gserviceaccount.com"
}
console.log(`key`, key)
const environment: string = process.env.NODE_ENV || 'dev';
if (environment !== 'dev')
  admin.initializeApp({
    credential: admin.credential.cert(key)
  })

const sendNoticationToFirebase = ( 
  taskRepository: TaskRepository,
  userRepository: UserRepository
) => async (task: ITask) => {

  const user: UserDto | null = await userRepository.getById(task.userId);

  if (user) {
    const registrationToken = user.registrationToken;
    const message = {
      notification: {
        title: task.title,
        body: task.description
      },
      token: registrationToken
    };

    admin.messaging().send(message)
      .then( () => {
        task.sentNotification = true;
        taskRepository.update(task, task._id);
      })
      .catch( error => {
          throw new Error(error);
      });
  }
} 

export default sendNoticationToFirebase;