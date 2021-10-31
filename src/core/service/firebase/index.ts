import mockSendNotification from './mock.firebase.service';
import sendNotificationToFirebase from './firebase.service';

const environment: string = process.env.NODE_ENV || 'dev';

export const sendNotification = environment == 'dev' ? mockSendNotification : sendNotificationToFirebase;