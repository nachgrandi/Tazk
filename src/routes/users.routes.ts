import {Router} from 'express';
import { signInOrSignUp, updateRegistrationToken } from '../controllers/user.controller';
import { userAuth } from '../middleware/index';

const router = Router();

router.post('/signInOrSignUp', userAuth, signInOrSignUp);
router.post('/updateRegistrationToken', userAuth, updateRegistrationToken);

export default router;