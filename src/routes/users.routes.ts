import {Router} from 'express';
import { signInOrSignUp } from '../controllers/user.controller';
import { userAuth } from '../middleware/index';

const router = Router();

router.post('/signInOrSignUp', userAuth, signInOrSignUp);

export default router;