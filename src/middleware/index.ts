import { mockAuth } from './mock.oAuth';
import { oAuth } from './oAuth.google';

const environment: string = process.env.NODE_ENV || 'dev';

export const userAuth = environment == 'dev' ? mockAuth : oAuth;