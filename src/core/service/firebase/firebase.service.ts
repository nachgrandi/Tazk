import { ITask } from '../../../datasource/mongodb/models/task.model';
import UserDto from '../../dto/user.dto';
import TaskRepository from '../../repository/task.repository';
import UserRepository from '../../repository/user.repository';
import config from '../../../config/config';
import admin from 'firebase-admin';

const key = {
  type: "service_account",
  projectId: 'tazk-1630450146860',
  privateKeyId: 'ce507db65b6932ed948e7863b30f6b5bc1975060',
  privateKey: '-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDjWPw7lc5/qLw6\nfk6/tQXnqt53QYQ3yIFNQ4WwPdbUb5k6TQ4exv1f4AJOpZmspqbu9/8Y9IXDGN6K\nlL8uZaMseNycIH3fdWRDGaXH/VxFuO20uWCsErHs/6HIPQgPj6jBCaqzAhocFXD8\nQPelHdAGcipRWfPyaFDvVml/XHO94L44WnFwqAiW0uTsopUHzPVfSubDkP5lCtAh\nBednWhvZQbHpgFNiGsH70ZJdEwOzVraKQ3vwmE8lw8MaX+4cJfwm/w4fyqErlZgX\nMCkRwvj5xJQb0PgB0etgXni3kG6+SPH+t8gZ1TDyMbPNkaPC47DriuGdm59fsp5g\naM3O9EdXAgMBAAECggEAAvET0nGNynkUdm1L948QFH9RgZmHbHFbuvQ0tqMWNIl9\nIhP9KsjIXoU3gm0CIAnH/y+WTWxcjrmzp3dlQeRuyBSIRjzlZA7QzU13p67Pktdh\nvATqC0/ynW5xWXXwtMLXHChT3R0Z2WMtoxX0Hl7UYkD36zWOwoQ3B+HGW6+Gj95i\nVwXgJqDduz8MED08NzI7WwymbXyEzWqwfetLts3f20IwNq+HcoGc9kB9LvZGLrNE\nbE22k2EHyNxAYiT4V6LCX6dM+ycoV76jKqcnSMXLOirxgtksJvjDpGgE4NWCvYed\naQAc0iZiV6hSe3Jcy5lJUTuyvG+WanRCkQZbXqJhAQKBgQD+5+aXLg78sbzEG+uZ\nnlIaRdlbbAHxTBMLVmDd8OJRho3Oby3SAEcdqc5zV2HKi/iSjZbe0oqjAFpJy0NW\nlN1w2ok03rKARv69fybn3NoRH4Gi9QEGBa1xJzX8tqF79s3KM0r1ms7IkzJi+qbd\nioH31eWB+McNfxa/FNkzqqssWQKBgQDkUs114a/hmMajciJRBIO+8GKbmkq80Ksd\n92NWHKFAUhXb9/wgKfWdHaZPfWc3pu4adMi5xNBXDAro4zs8x435qiTAXNNzVmgW\nlOuwUsXjCLNXQJF0W0MVpLtq1yfU4VYKoLOEh7fEvGGwSjWRtCFySUOSUgQCxTwq\n+5WFUG/bLwKBgFMxQkvC53dHVtE2P41SY39Znpe8x2GGL4z6swCcVnC/FlbyaCTq\nnEstGUkBktP1HLpP5ZZxZnfObKk64o5GZYMof7E2oVFGWmtkLUFtDeqauseBaMUb\nY0DTyEXjIQ8BPKaqWOORk71YdRBit8UEKGjHcXEazXQ1LypL1puLLvR5AoGAIqvw\nR1ZePwPUJj3OuD7XQsd+MeLcNo/5bDOFAi6Wzg2pBB5ESx4UDifSeX+xjOHshlf1\no0Af4xgREAxxkmk7Rg5wRkXSVlFovQUgRUZMho1rrnQ/oku5hC/fxfmmMs2FI1gD\n6rwxS87PhtW+DMIt0g0OFcoekc0hteU+b2AnnEECgYAwur0B97SzTgNznZ38aR1R\nOPX6a8cTHomqOdInFjhLE0h43j2QGbAXkpx7YS71Erd9IqPrJ8XW0Ju6rWeuqwGO\nMDxiHw3X9hz1rjvGmdElLZoYweVsaC/jRCBA/1xycaLcx5hp5rdwVir5MkFeobwz\n3v9Hu4zE3ViGDyBJ8S8tCg==\n-----END PRIVATE KEY-----\n',
  clientEmail: 'firebase-adminsdk-s7kud@tazk-1630450146860.iam.gserviceaccount.com',
  clientId: '103995721015785816676',
  authUri: "https://accounts.google.com/o/oauth2/auth",
  tokenUri: "https://oauth2.googleapis.com/token",
  authProviderX509CertUrl: "https://www.googleapis.com/oauth2/v1/certs",
  clientX509CertUrl: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-s7kud%40tazk-1630450146860.iam.gserviceaccount.com"
}

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